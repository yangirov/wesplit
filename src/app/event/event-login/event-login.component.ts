import { Component, OnInit } from '@angular/core';
import { Event, EventDto } from '../../../models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member/add-member.component';

@Component({
  selector: 'app-event-login',
  templateUrl: './event-login.component.html',
  styleUrls: ['./event-login.component.scss'],
})
export class EventLoginComponent implements OnInit {
  eventId!: string;
  userId!: string;

  event!: Event;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.eventId = this.activateRoute.snapshot.params['id'];
    this.userId = this.activateRoute.snapshot.queryParams['uid'];

    if (this.userId) {
      localStorage.setItem('uid', this.userId);

      this.dataService
        .getEventById(this.eventId, this.userId)
        .subscribe((event: EventDto) => {
          this.event = event;
        });
    } else {
      this.dataService
        .getEventById(this.eventId)
        .subscribe((event: EventDto) => {
          this.event = event;
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '250px',
      data: { name: this.name },
    });

    const members = this.event.members.map((x) => x.toLowerCase());

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && !members.includes(result.toLowerCase())) {
        this.event.members.push(result);
        await this.dataService.updateEvent(this.event);
        await this.setEventMember(result);
      }
    });
  }

  async setEventMember(member: string) {
    this.dataService.setEventUser(this.eventId, member);
    await this.router.navigate(['events', this.eventId]);
  }
}
