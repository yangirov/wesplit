import { Component, Input, OnInit } from '@angular/core';
import { DebtTypes, EventDto } from '../../../models/Event';
import { getEventBalance } from '../../../utils/BalanceCalculator';
import { formatDebtType, formatSum } from '../../../utils/Formatters';
import * as moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() public event!: EventDto;

  public date!: string;
  public sum!: string | null;
  public debtType!: string;
  public debtStatus!: string | null;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    const { organizer, members, date } = this.event;

    const lang = this.translocoService.getActiveLang();

    this.date = `${moment(date).locale(lang).format('DD MMMM')}, ${moment(date)
      .locale(lang)
      .format('dddd')}`;

    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === organizer)?.sum || 0;
    const sum = Math.round(currentBalance);

    this.sum = sum == 0 ? null : `${formatSum(lang, Math.abs(sum))}`;

    const hasOutgoingDebts = this.translocoService.translate(
      'common.hasOutgoingDebts',
      {},
      lang
    );
    const hasIncomingDebts = this.translocoService.translate(
      'common.hasIncomingDebts',
      {},
      lang
    );

    this.debtStatus =
      sum !== 0 ? (sum > 0 ? hasOutgoingDebts : hasIncomingDebts) : null;

    this.debtType = DebtTypes[formatDebtType(currentBalance)].toLowerCase();
  }
}
