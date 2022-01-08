import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDto } from '../../../models/Event';
import { DataService } from '../../../shared/events/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareEventComponent } from './share-event/share-event.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  eventId: string;
  event!: EventDto;
  opened: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.eventId = activateRoute.snapshot.params['id'];
  }

  async ngOnInit(): Promise<any> {
    this.loading$.next(true);

    if (history.state.isCreated) {
      this.openShareModal();
    }

    if (!this.dataService.getCurrentUser(this.eventId)) {
      await this.router.navigate(['login'], { relativeTo: this.activateRoute });
    }

    this.dataService.getEventById(this.eventId).subscribe((event: EventDto) => {
      this.event = event;
      this.title.setTitle(`${event.name} - ${environment.name}`);
      this.loading$.next(false);
    });
  }

  closeSidenav() {
    this.opened = false;
  }

  openShareModal() {
    this.dialog.open(ShareEventComponent, {
      width: '350px',
      data: this.eventId,
    });
  }
}
