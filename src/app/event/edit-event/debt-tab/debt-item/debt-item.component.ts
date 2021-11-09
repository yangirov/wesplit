import { Component, Input, OnInit } from '@angular/core';
import { Event, MemberDebt } from '../../../../../models/Event';
import sumFormat, { formatStatus } from '../../../../../utils/Formatters';
import {
  getDebtType,
  getEventBalance,
} from '../../../../../utils/BalanceCalculator';

@Component({
  selector: 'debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.scss'],
})
export class DebtItemComponent implements OnInit {
  @Input() public debt!: MemberDebt;
  @Input() public event!: Event;

  constructor() {}

  ngOnInit(): void {}

  sum() {
    return sumFormat(this.debt?.sum || 0);
  }

  debtType() {
    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === this.event.organizer)?.sum || 0;
    return getDebtType(currentBalance);
  }
}
