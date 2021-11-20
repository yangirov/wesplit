import { Component, Input, OnInit } from '@angular/core';
import { EventDto, LocalEvent } from '../../../../models/Event';
import * as moment from 'moment';
import { getLocalEvents } from '../../../../shared/local-storage.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../shared/data.service';

@Component({
  selector: 'event-sidenav',
  templateUrl: './event-sidenav.component.html',
  styleUrls: ['./event-sidenav.component.scss'],
})
export class EventSidenavComponent implements OnInit {
  @Input() event!: EventDto;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  get eventSubtitle(): string {
    const memberStatus = `${this.event.members.length} участников`;
    const formattedDate = moment(this.event.date)
      .locale('ru')
      .format('DD MMMM');

    return `${memberStatus} • ${formattedDate}`;
  }

  get hasRePayedDebts(): boolean {
    return this.event?.rePayedDebts?.length > 0;
  }

  getMemberName(name: string) {
    let memberName: string = name;

    if (name === this.dataService.getCurrentUser(this.event.id)) {
      memberName += ' (Вы)';
    }

    if (name === this.event.organizer) {
      memberName += ' ★';
    }

    return memberName;
  }
}
