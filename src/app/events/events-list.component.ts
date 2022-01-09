import { Component, OnInit } from '@angular/core';
import { EventDto } from '../../models/Event';
import { DataService } from '../../shared/data.service';
import { BehaviorSubject } from 'rxjs';
import { setLocalEvents } from '../../utils/EventLocalStorage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  events: EventDto[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loading$.next(true);

    this.dataService
      .getEvents()
      .pipe(take(1))
      .subscribe(
        (events: EventDto[]) => {
          this.events = events;
          setLocalEvents(events);
        },
        (err) => console.error(err),
        () => this.loading$.next(false)
      );
  }
}
