import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDto } from '../../../models/Event';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareEventComponent } from './share-event/share-event.component';

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  eventId: string;
  event!: EventDto;
  opened: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    this.eventId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dataService.getEventById(this.eventId).subscribe((event: EventDto) => {
      this.event = event;
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
