import { Component, OnInit } from '@angular/core';
import { Event, EventDto } from '../../../models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member/add-member.component';
import { EventActionCreator } from '../../../shared/event-action-creator';
import { TitleService } from '../../../shared/title.service';

@Component({
  selector: 'app-event-login',
  templateUrl: './event-login.component.html',
  styleUrls: ['./event-login.component.scss'],
  providers: [TitleService],
})
export class EventLoginComponent implements OnInit {
  eventId: string;
  event!: Event;

  name!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private eventActionCreator: EventActionCreator,
    public titleService: TitleService
  ) {
    this.eventId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.titleService.getTitle();

    this.dataService.getEventById(this.eventId).subscribe((event: EventDto) => {
      this.event = event;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '250px',
      data: { name: this.name },
    });

    const members = this.event.members.map((x) => x.toLowerCase());

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && !members.includes(result.toLowerCase())) {
        const action = this.eventActionCreator.addMemberToEvent(
          'Через приглашение',
          result
        );

        this.event.members.push(result);
        this.dataService.updateEvent(this.event);
        this.dataService.addEventAction(this.eventId, action);
        this.dataService.setEventUser(this.eventId, result);
        await this.setEventMember(result);
      }
    });
  }

  async setEventMember(member: string) {
    this.dataService.setEventUser(this.eventId, member);
    await this.router.navigate(['events', this.eventId]);
  }
}
