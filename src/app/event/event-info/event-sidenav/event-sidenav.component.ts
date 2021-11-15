import { Component, Input, OnInit } from '@angular/core';
import { Event, LocalEvent } from '../../../../models/Event';
import * as moment from 'moment';
import { getLocalEvents } from '../../../../shared/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'event-sidenav',
  templateUrl: './event-sidenav.component.html',
  styleUrls: ['./event-sidenav.component.scss'],
})
export class EventSidenavComponent implements OnInit {
  @Input() event!: Event;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  get eventSubtitle(): string {
    const memberStatus = `${this.event.members.length} участников`;
    const formattedDate = moment(this.event.date)
      .locale('ru')
      .format('DD MMMM');

    return `${memberStatus} • ${formattedDate}`;
  }

  getMemberName(name: string) {
    const currentUser = getLocalEvents().find(
      (x: LocalEvent) => x.id === this.event.id
    )?.organizer;

    let memberName: string = name;

    if (name === currentUser) {
      memberName += ' (Вы)';
    }

    if (name === this.event.organizer) {
      memberName += ' ★';
    }

    return memberName;
  }
}
