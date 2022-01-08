import { Component, Input, OnInit } from '@angular/core';
import { DebtTypes, EventDto } from '../../../models/Event';
import { getEventBalance } from '../../../utils/BalanceCalculator';
import { formatDebtType, formatSum } from '../../../utils/Formatters';
import * as moment from 'moment';
import { DataService } from '../../../shared/events/data.service';
import { LocalizationService } from '../../../shared/settings/localization.service';

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

  constructor(
    private localizationService: LocalizationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const { id, date } = this.event;

    const organizer = this.dataService.getCurrentUser(id);
    const lang = this.localizationService.getActiveLang();

    this.date = `${moment(date).locale(lang).format('DD MMMM')}, ${moment(date)
      .locale(lang)
      .format('dddd')}`;

    const eventBalance = getEventBalance(this.event);
    const currentBalance =
      eventBalance.find((x) => x.name === organizer)?.sum || 0;
    const sum = Math.round(currentBalance);

    this.sum = sum == 0 ? null : `${formatSum(lang, Math.abs(sum))}`;

    const hasOutgoingDebts = this.localizationService.translate(
      'common.hasOutgoingDebts'
    );
    const hasIncomingDebts = this.localizationService.translate(
      'common.hasIncomingDebts'
    );

    this.debtStatus =
      sum !== 0 ? (sum > 0 ? hasOutgoingDebts : hasIncomingDebts) : null;

    this.debtType = DebtTypes[formatDebtType(currentBalance)].toLowerCase();
  }
}
