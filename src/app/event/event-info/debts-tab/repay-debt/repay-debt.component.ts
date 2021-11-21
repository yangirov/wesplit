import { Component, Inject, OnInit } from '@angular/core';
import { DebtDto } from '../../../../../models/Event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sumGreaterZero } from '../../../../../utils/FormValidators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../../shared/data.service';
import { EventActionCreator } from '../../../../../shared/event-action-creator';
import { BehaviorSubject } from 'rxjs';

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
    @Inject(MAT_DIALOG_DATA) public payload: DebtDto
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
        validators: [sumGreaterZero()],
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

    let debtFrom = debt.from;
    if (currentUser === debtFrom) {
      debtFrom = debt.to;
    }

    const action =
      Math.abs(currentDebtSum) === debt.sum
        ? this.eventActionCreator.giveBack(
            currentUser,
            debtFrom,
            currentDebtSum
          )
        : this.eventActionCreator.giveBackPartially(
            currentUser,
            debtFrom,
            currentDebtSum
          );

    await this.dataService.addEventAction(event.id, action);

    await this.dataService
      .addRePayedDebt(event.id, {
        sum: currentDebtSum,
        name: debtFrom.replace(' (Вы)', ''),
      })
      .then((res) => {
        this.loading$.next(false);
        this.dialogRef.close();
        location.reload();
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
