import { Component, OnInit } from '@angular/core';
import { Event, EventDto } from '../../../models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member/add-member.component';
import { AuthenticationService } from '../../../shared/authentication.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { EventHeaderComponent } from '../event-info/event-sidenav/event-header/event-header.component';
import { GreyTitleComponent } from '../../base-elements/grey-title/grey-title.component';
import { MatButton } from '@angular/material/button';
import { SpinnerComponent } from '../../base-elements/spinner/spinner.component';

@Component({
  selector: 'app-event-login',
  templateUrl: './event-login.component.html',
  styleUrls: ['./event-login.component.scss'],
  standalone: true,
  imports: [
    TranslocoDirective,
    EventHeaderComponent,
    GreyTitleComponent,
    MatButton,
    SpinnerComponent,
  ],
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
    private dataService: DataService,
    private authService: AuthenticationService
  ) {}

  async ngOnInit() {
    this.eventId = this.activateRoute.snapshot.params['id'];
    this.userId = this.activateRoute.snapshot.queryParams['uid'];

    if (this.userId) {
      await this.authService
        .logout()
        .then(() => {
          localStorage.setItem('uid', this.userId);
        })
        .catch(console.error);
    }

    this.dataService.getEventById(this.eventId, this.userId).subscribe(async (event: EventDto) => {
      if (event) {
        this.event = event;
      } else {
        await this.router.navigate(['/', 'events']);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '250px',
      data: { name: this.name },
    });

    const members = this.event.members.map(x => x.toLowerCase());

    dialogRef.afterClosed().subscribe(async result => {
      if (result && !members.includes(result.toLowerCase())) {
        this.event.members.push(result);
        await this.dataService.updateEvent(this.event);
        await this.setEventMember(result);
      }
    });
  }

  async setEventMember(member: string) {
    this.dataService.setEventUser(this.eventId, member);
    await this.router.navigate(['/', 'events', this.eventId]);
  }
}
