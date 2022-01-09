import { Component, Inject, OnInit } from '@angular/core';
import { DebtDto } from '../../../../../models/Event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  sumGreaterZero,
  sumLessOrEqualDebt,
} from '../../../../../utils/FormValidators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../../shared/data.service';
import { EventActionCreator } from '../../../../../utils/EventActionCreator';
import { BehaviorSubject } from 'rxjs';
import { LocalizationService } from '../../../../../shared/localization.service';

@Component({
  selector: 'repay-debt',
  templateUrl: './repay-debt.component.html',
  styleUrls: ['./repay-debt.component.scss'],
})
export class RepayDebtComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  rePayDebtForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private eventActionCreator: EventActionCreator,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RepayDebtComponent>,
    @Inject(MAT_DIALOG_DATA) public payload: DebtDto,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.rePayDebtForm = this.formBuilder.group(
      {
        sum: [
          this.payload.debt.sum || 0,
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ]),
        ],
      },
      {
        validators: [
          sumGreaterZero(),
          sumLessOrEqualDebt(this.payload.debt.sum),
        ],
      }
    );
  }

  async onSubmit() {
    this.loading$.next(true);
    this.rePayDebtForm.disable();

    const event = this.payload.event;
    const debt = this.payload.debt;
    const currentUser = this.payload.currentUser;

    const currentDebtSum = this.rePayDebtForm.value.sum;

    const action =
      Math.abs(currentDebtSum) === debt.sum
        ? this.eventActionCreator.giveBack(
            currentUser,
            debt.from,
            currentDebtSum
          )
        : this.eventActionCreator.giveBackPartially(
            currentUser,
            debt.from,
            currentDebtSum
          );

    Promise.all<any, any, any>([
      this.dataService.addEventAction(event.id, action),
      this.dataService.updateRePayedDebt(event.id, {
        sum: Number(currentDebtSum),
        name: this.getName(debt.from),
      }),
      this.dataService.updateRePayedDebt(event.id, {
        sum: Number(currentDebtSum * -1),
        name: this.getName(debt.to),
      }),
    ]).then((res) => {
      this.loading$.next(false);
      this.dialogRef.close();
      location.reload();
    });
  }

  getName(name: string): string {
    const youText = this.localizationService.translate('common.you');
    return name.replace(` (${youText})`, '');
  }

  onCancel() {
    this.dialogRef.close();
  }
}
