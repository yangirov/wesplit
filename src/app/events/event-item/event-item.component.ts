import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { getEventBalance } from '../../../utils/BalanceCalculator';
import {
  formatSum,
  formatDebtType,
  formatStatus,
} from '../../../utils/Formatters';
import * as moment from 'moment';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() public event!: Event;

  public date!: string;
  public sum!: string | null;
  public debtType!: string;
  public debtStatus!: string | null;

  constructor() {}

  ngOnInit(): void {
    const { organizer, members, date } = this.event;

    this.date = `${moment(date).locale('ru').format('DD MMMM')}, ${moment(date)
      .locale('ru')
      .format('dddd')}`;

    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === organizer)?.sum || 0;
    const sum = Math.round(currentBalance);

    this.sum = sum == 0 ? null : `${formatSum(Math.abs(sum))}`;
    this.debtStatus = formatStatus(sum);
    this.debtType = formatDebtType(currentBalance);
  }
}
