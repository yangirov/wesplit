import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../models/Event';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareEventComponent } from './share-event/share-event.component';

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  id: string;
  event!: Event;

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    public dialog: MatDialog
  ) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dataService.getEventById(this.id).subscribe((event: Event) => {
      this.event = event;
    });
  }

  openShareModal() {
    const dialogRef = this.dialog.open(ShareEventComponent, {
      width: '350px',
      data: this.id,
    });
  }
}
