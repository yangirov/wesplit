import { Component, Input, OnInit } from '@angular/core';
import { EventDto, MemberDebt } from '../../../../../models/Event';
import { formatDebtType, formatSum } from '../../../../../utils/Formatters';
import { getEventBalance } from '../../../../../utils/BalanceCalculator';

@Component({
  selector: 'debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.scss'],
})
export class DebtItemComponent implements OnInit {
  @Input() public debt!: MemberDebt;
  @Input() public event!: EventDto;

  constructor() {}

  ngOnInit(): void {}

  get debtSum(): string {
    return formatSum(this.debt?.sum || 0);
  }

  get debtType(): string {
    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === this.event.organizer)?.sum || 0;
    return formatDebtType(currentBalance);
  }
}
