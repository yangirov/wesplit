import { Component, OnInit } from '@angular/core';
import { EventDto } from '../../models/Event';
import { DataService } from '../../shared/data.service';
import { BehaviorSubject } from 'rxjs';
import { TitleService } from '../../shared/title.service';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  providers: [TitleService],
})
export class EventsListComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  events: EventDto[] = [];

  constructor(
    private dataService: DataService,
    public titleService: TitleService
  ) {}

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
