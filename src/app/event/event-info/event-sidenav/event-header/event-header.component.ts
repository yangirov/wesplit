import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../../../../../models/Event';
import { LocalizationService } from '../../../../../shared/localization.service';

@Component({
  selector: 'event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
})
export class EventHeaderComponent implements OnInit {
  @Input() event!: Event;

  constructor(private localizationService: LocalizationService) {}

  ngOnInit(): void {}

  get eventSubtitle(): string {
    const lang = this.localizationService.getActiveLang();

    const membersText = this.localizationService.translate('common.members');
    const memberStatus = `${this.event?.members?.length ?? 0} ${membersText}`;
    const formattedDate = moment(this.event.date)
      .locale(lang)
      .format('DD MMMM');

    return `${memberStatus} • ${formattedDate}`;
  }
}
