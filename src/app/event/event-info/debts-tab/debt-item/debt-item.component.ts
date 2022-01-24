import { Component, Input } from '@angular/core';
import {
  DebtDto,
  DebtTypes,
  EventDto,
  MemberDebt,
} from '../../../../../models/Event';
import { MatDialog } from '@angular/material/dialog';
import { RepayDebtComponent } from '../repay-debt/repay-debt.component';
import { DataService } from '../../../../../shared/data.service';
import { CurrencyService } from '../../../../../shared/currency.service';

@Component({
  selector: 'debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.scss'],
})
export class DebtItemComponent {
  @Input() public event!: EventDto;
  @Input() public debt!: MemberDebt;
  @Input() public debtType!: DebtTypes;

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    public currencyService: CurrencyService
  ) {}

  get debtTypeName() {
    return DebtTypes[this.debtType].toLowerCase();
  }

  openRePayDebtModal() {
    if (this.debtType !== DebtTypes.Neutral) {
      const currentUser = this.dataService.getCurrentUser(this.event.id);

      const debtDto: DebtDto = {
        event: this.event,
        debt: this.debt,
        currentUser,
      };

      this.dialog.open(RepayDebtComponent, {
        width: '400px',
        data: debtDto,
      });
    }
  }
}
