import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Receipt, ReceiptPurchase } from '../../../../models/Receipt';
import { AuthenticationService } from '../../../../shared/authentication.service';
import { filter, take } from 'rxjs/operators';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { environment } from '../../../../environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  minLengthArray,
  minPurchaseInReceipt,
} from '../../../../utils/FormValidators';
import { EventAction, EventDto, Purchase } from '../../../../models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../shared/data.service';
import * as moment from 'moment';
import { LocalizationService } from '../../../../shared/localization.service';
import { EventActionCreator } from '../../../../utils/EventActionCreator';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit, AfterViewInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  eventId!: string;

  event!: EventDto;
  userToken!: string;

  qrCodeScanner!: Html5QrcodeScanner;
  isSuccessScan: boolean = false;

  receipt!: Receipt;
  receiptForm!: FormGroup;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private localizationService: LocalizationService,
    private eventActionCreator: EventActionCreator
  ) {}

  ngOnInit() {
    this.loading$.next(true);

    this.eventId = this.activateRoute.snapshot.params['id'];

    this.dataService
      .getEventById(this.eventId)
      .pipe(take(1))
      .subscribe(
        (event: EventDto) => {
          this.event = event;
        },
        (err) => console.error(err),
        () => this.loading$.next(false)
      );

    this.authService.currentUser$
      .pipe(filter((x) => x != null))
      .subscribe((x: any) => {
        this.userToken = x.stsTokenManager.accessToken;
      });

    this.receiptForm = this.formBuilder.group(
      {
        purchases: this.formBuilder.array([]),
      },
      {
        validators: [minLengthArray(1, 'purchases'), minPurchaseInReceipt()],
      }
    );
  }

  fillFormArray() {
    const config = this.receipt.items.map(({ name, price, sum, quantity }) =>
      this.formBuilder.group({
        name,
        price,
        sum,
        quantity,
        selected: false,
      })
    );

    this.receiptForm.setControl(
      'purchases',
      this.formBuilder.array(config || [])
    );
  }

  ngAfterViewInit(): void {
    const config = {
      fps: 10,
      qrbox: {
        width: 120,
        height: 120,
      },
    };

    setTimeout(() => {
      this.qrCodeScanner = new Html5QrcodeScanner('qr-reader', config, false);
      this.qrCodeScanner.render(
        this.onScanSuccess.bind(this),
        this.onScanFailure.bind(this)
      );

      // this.isSuccessScan = true;
      // const qrText =
      //   't=20220111T1340&s=702.64&fn=9960440301573952&i=5106&fp=3364516555&n=1';
      // this.onScanSuccess(qrText, null);
    }, 2000);
  }

  get purchases(): FormArray {
    return this.receiptForm.get('purchases') as FormArray;
  }

  get receiptDate(): string {
    const lang = this.localizationService.getActiveLang();
    const date = this.receipt.date;

    return `${moment(date).locale(lang).format('DD MMMM')}, ${moment(date)
      .locale(lang)
      .format('dddd')}`;
  }

  get receiptTotalSum(): string {
    const summaryText = this.localizationService.translate(
      'event.qr-receipt.summary'
    );

    return `${summaryText}: ${this.receipt.totalSum}`;
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    if (this.isSuccessScan) {
      this.qrCodeScanner.clear().then(() => {});
    }

    this.isSuccessScan = true;

    const obj = decodeURI(decodedText)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"');

    const data = JSON.parse(`{ "${obj} "}`);

    this.httpClient
      .post<any>(`${environment.functionsUrl}/check`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userToken,
          Host: 'us-central1-wesplit-840b9.cloudfunctions.net',
        },
      })
      .subscribe(
        (res: Receipt) => {
          this.receipt = res;
          this.fillFormArray();
        },
        (err: any) => console.log(err)
      );
  }

  onScanFailure(error: string) {
    console.warn(`Code scan error = ${error}`);
  }

  async onBack() {
    await this.router.navigate(['events', this.eventId]);
  }

  async onSubmit() {
    if (this.receiptForm.valid) {
      this.loading$.next(true);

      const currentUser = this.dataService.getCurrentUser(this.eventId);

      const purchases = this.purchases?.value.filter(
        (x: ReceiptPurchase) => x.selected
      );

      const eventPurchases = purchases.map((x: ReceiptPurchase) => {
        return {
          title: x.name,
          date: this.receipt.date,
          payer: currentUser,
          sum: x.sum,
          members: this.event.members,
        };
      });

      const eventActions = purchases.map((x: ReceiptPurchase) =>
        this.eventActionCreator.addPurchase(currentUser, x.name, x.sum)
      );

      return await Promise.all([
        eventPurchases.map(async (purchase: Purchase) => {
          await this.dataService.addPurchase(this.eventId, purchase);
        }),
        eventActions.map(async (eventAction: EventAction) => {
          await this.dataService.addEventAction(this.eventId, eventAction);
        }),
      ])
        .then(async () => await this.onBack())
        .finally(() => this.loading$.next(false));
    }
  }
}
