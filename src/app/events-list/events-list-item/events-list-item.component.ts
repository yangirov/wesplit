import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { getDebtType, getEventBalance } from '../../../utils/BalanceCalculator';
import sumFormat, { formatStatus } from '../../../utils/Formatters';
import * as moment from 'moment';

@Component({
  selector: 'events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss'],
})
export class EventsListItemComponent implements OnInit {
  @Input() public event!: Event;

  public id?: string;
  public title?: string;
  public membersCount?: number;
  public date?: string;
  public sum?: string | null;
  public debtType?: string;
  public debtSum?: string | null;

  constructor() {}

  ngOnInit(): void {
    const { id, name, organizer, members, date } = this.event;

    this.id = id;
    this.title = name;
    this.membersCount = members.length;
    this.date = `${moment(date).locale('ru').format('DD MMMM')}, ${moment(date)
      .locale('ru')
      .format('dddd')}`;

    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === organizer)?.sum || 0;
    const sum = Math.round(currentBalance);
    this.sum = sum == 0 ? null : `${sumFormat(Math.abs(sum))}`;
    this.debtSum = formatStatus(sum);
    this.debtType = getDebtType(currentBalance);
  }
}
