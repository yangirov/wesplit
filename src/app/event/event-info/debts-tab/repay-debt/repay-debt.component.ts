import { Component, Inject, Input, OnInit } from '@angular/core';
import { DebtDto, MemberDebt } from '../../../../../models/Event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sumGreaterZero } from '../../../../../utils/FormValidators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../../../shared/data.service';

@Component({
  selector: 'repay-debt',
  templateUrl: './repay-debt.component.html',
  styleUrls: ['./repay-debt.component.scss'],
})
export class RepayDebtComponent implements OnInit {
  rePayDebtForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RepayDebtComponent>,
    @Inject(MAT_DIALOG_DATA) public payload: DebtDto
  ) {}

  ngOnInit(): void {
    this.rePayDebtForm = this.formBuilder.group(
      {
        sum: [
          Math.abs(this.payload.debt.sum || 0),
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

  onSubmit() {
    this.dataService.addRePayedDebt(this.payload.eventId, {
      sum: this.rePayDebtForm.value.sum,
      name: this.payload.debt.from,
    });
    // TODO
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
