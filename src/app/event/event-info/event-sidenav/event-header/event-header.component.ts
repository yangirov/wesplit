import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../../../../../models/Event';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
})
export class EventHeaderComponent implements OnInit {
  @Input() event!: Event;

  constructor(private translocoSerrvice: TranslocoService) {}

  ngOnInit(): void {}

  get eventSubtitle(): string {
    const lang = this.translocoSerrvice.getActiveLang();

    const membersText = this.translocoSerrvice.translate(
      'common.members',
      {},
      lang
    );
    const memberStatus = `${this.event.members.length} ${membersText}`;
    const formattedDate = moment(this.event.date)
      .locale(lang)
      .format('DD MMMM');

    return `${memberStatus} • ${formattedDate}`;
  }
}
