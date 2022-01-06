import { Component, OnInit } from '@angular/core';
import { EventDto } from '../../models/Event';
import { DataService } from '../../shared/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  events: EventDto[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents().subscribe(
      (event: EventDto) => {
        if (event.id) {
          this.events.push(event);
        }

        this.loading$.next(false);
      },
      (err) => console.error(err),
      () => {
        this.loading$.next(false);
      }
    );
  }
}
