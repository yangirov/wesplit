import { Component, Input } from '@angular/core';
import { EventDto } from '../../../../models/Event';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DataService } from '../../../../shared/data.service';

@Component({
  selector: 'event-sidenav',
  templateUrl: './event-sidenav.component.html',
  styleUrls: ['./event-sidenav.component.scss'],
})
export class EventSidenavComponent {
  @Input() event!: EventDto;

  constructor(private dataService: DataService, private router: Router) {}

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
