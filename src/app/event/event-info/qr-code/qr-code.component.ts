import {
  AfterViewChecked, AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Receipt} from "../../../../models/Receipt";
import {AuthenticationService} from "../../../../shared/authentication.service";
import {filter} from "rxjs/operators";
import {Html5QrcodeScanner} from "html5-qrcode"
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit, AfterViewInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  qrCodeScanner!: Html5QrcodeScanner;
  isSuccessScan: boolean = false;

  receipt!: Receipt;
  userToken!: string;

  constructor(
    private location: Location,
    private httpClient: HttpClient,
    private  authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.currentUser$
      .pipe(filter(x => x != null))
      .subscribe((x: any) => {
        this.userToken = x.stsTokenManager.accessToken;
      });
  }

  ngAfterViewInit(): void {
    const config =  {
      fps: 10,
      qrbox: {
        width: 120,
        height: 120
      }
    };

    setTimeout(() => {
      this.qrCodeScanner = new Html5QrcodeScanner("qr-reader", config, false);
      this.qrCodeScanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
    }, 500);
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    if (this.isSuccessScan) {
      this.qrCodeScanner.clear();
    }

    this.isSuccessScan = true;

    const obj = decodeURI(decodedText)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"');

    const data = JSON.parse(`{ "${obj} "}`);

    this.httpClient.post<any>(`/check`, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.userToken,
          'Host': "us-central1-wesplit-840b9.cloudfunctions.net"
        }
      }).subscribe(
      (res: Receipt) => {
        this.receipt = res;
      },
      (err: any) => console.log(err)
    );
  }

  onScanFailure(error: string) {
    console.warn(`Code scan error = ${error}`);
  }

  onBack() {
    this.location.back();
  }
}
