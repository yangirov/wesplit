import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EventDto, Purchase, PurchaseMember } from '../../../models/Event';
import { EventActionCreator } from '../../../shared/event-action-creator';
import {
  minMembersCountInPurchase,
  sumGreaterZero,
} from '../../../utils/FormValidators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../base-elements/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent implements OnInit {
  isEdit!: boolean;
  eventId!: string;
  event!: EventDto;
  purchaseId!: string;
  purchase!: Purchase;
  purchaseForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private dataService: DataService,
    private eventActionCreator: EventActionCreator,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';
    this.purchaseId = this.route.snapshot.paramMap.get('purchaseId') ?? '';

    this.purchaseForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        payer: new FormControl(
          { value: '', disabled: this.hasRePayedDebts },
          Validators.required
        ),
        sum: new FormControl(
          { value: 0, disabled: this.hasRePayedDebts },
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ])
        ),
        members: this.formBuilder.array([]),
      },
      {
        validators: [sumGreaterZero(), minMembersCountInPurchase()],
      }
    );

    this.dataService.getEventById(this.eventId).subscribe((event) => {
      this.event = event;

      if (this.isEdit && this.purchaseId) {
        this.fillFormFromEvent();
      } else {
        this.checkAllMembers(true);
      }

      this.loading$.next(false);
    });
  }

  get members(): FormArray {
    return this.purchaseForm.get('members') as FormArray;
  }

  get title(): string {
    return this.isEdit && this.purchaseId
      ? 'Редактирование покупки'
      : 'Новая покупка';
  }

  get hasRePayedDebts(): boolean {
    return this.event?.rePayedDebts?.length > 0;
  }

  fillFormFromEvent() {
    const purchase = this.event.purchases.find((x) => x.id === this.purchaseId);

    if (purchase) {
      this.purchase = purchase;

      this.purchaseForm.patchValue({
        title: purchase.title,
        payer: purchase.payer,
        sum: purchase.sum,
      });

      this.fillFormArray(
        this.event.members.map((name) =>
          this.formBuilder.group({
            name,
            selected: purchase.members.some((x) => x === name),
          })
        )
      );

      if (this.hasRePayedDebts) {
        this.members.controls.forEach((control) => {
          control.disable();
        });
      }
    }
  }

  checkAllMembers(selected: boolean) {
    this.fillFormArray(
      this.event.members.map((name) =>
        this.formBuilder.group({ name, selected })
      )
    );
  }

  fillFormArray(config: any) {
    this.purchaseForm.setControl(
      'members',
      this.formBuilder.array(config || [])
    );
  }

  mapPurchase(): Purchase {
    const { title, payer, sum } = this.purchaseForm.value as Purchase;

    if (this.hasRePayedDebts && this.isEdit) {
      return {
        title,
        date: this.purchase.date,
        payer: this.purchase.payer,
        sum: this.purchase.sum,
        members: this.purchase.members,
      };
    }

    return {
      date: this.isEdit ? this.purchase.date : moment().utc().valueOf(),
      title,
      payer,
      sum,
      members: this.members?.value
        .filter((x: PurchaseMember) => x.selected)
        .map((x: PurchaseMember) => x.name),
    };
  }

  async onSubmit() {
    if (this.purchaseForm.valid) {
      this.loading$.next(true);

      const purchase = this.mapPurchase();

      if (this.isEdit && this.purchaseId) {
        await this.dataService.updatePurchase(
          this.event.id,
          this.purchaseId,
          purchase
        );

        await this.onChange();
      } else {
        await this.dataService.addPurchase(this.eventId, purchase);

        const currentUser = this.dataService.getCurrentUser(this.event.id);
        const action = this.eventActionCreator.addPurchase(
          currentUser,
          purchase.title,
          purchase.sum
        );

        await this.dataService.addEventAction(this.eventId, action);
        await this.onChange();
      }
    }
  }

  async onDeletePurchase() {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
    });

    await this.dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading$.next(true);
        await this.dataService.deletePurchase(this.eventId, this.purchaseId);

        const currentUser = this.dataService.getCurrentUser(this.eventId);
        const action = await this.eventActionCreator.deletePurchase(
          currentUser,
          this.purchase.title
        );
        await this.dataService.addEventAction(this.eventId, action);

        await this.onChange();
      }

      this.dialogRef = null as any;
    });
  }

  async onChange() {
    await this.router.navigate(['events', this.eventId]);
    this.loading$.next(false);
  }
}
