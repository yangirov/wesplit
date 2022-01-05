import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../../../../../models/Event';

@Component({
  selector: 'event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
})
export class EventHeaderComponent implements OnInit {
  @Input() event!: Event;

  ngOnInit(): void {}

  get eventSubtitle(): string {
    const memberStatus = `${this.event.members.length} участников`;
    const formattedDate = moment(this.event.date)
      .locale('ru')
      .format('DD MMMM');

    return `${memberStatus} • ${formattedDate}`;
  }
}
