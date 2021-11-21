import { Component, Input, OnInit } from '@angular/core';
import {
  ActionTypes,
  DebtDto,
  DebtTypes,
  EventDto,
  MemberDebt,
} from '../../../../../models/Event';
import { MatDialog } from '@angular/material/dialog';
import { RepayDebtComponent } from '../repay-debt/repay-debt.component';
import { DataService } from '../../../../../shared/data.service';

@Component({
  selector: 'debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.scss'],
})
export class DebtItemComponent implements OnInit {
  @Input() public event!: EventDto;
  @Input() public debt!: MemberDebt;
  @Input() public debtType!: DebtTypes;

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {}

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
