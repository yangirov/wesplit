import { Component, OnInit } from '@angular/core';
import { EventDto } from '../../../models/Event';
import { DataService } from '../../../shared/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { setLocalEvents } from '../../../utils/EventLocalStorage';
import { take } from 'rxjs/operators';
import { TranslocoDirective } from '@ngneat/transloco';
import { SidenavLayoutComponent } from '../../base-elements/layouts/sidenav-layout/sidenav-layout.component';
import { EventItemComponent } from '../event-item/event-item.component';
import { EmptyItemsComponent } from '../../base-elements/empty-items/empty-items.component';
import { FabButtonComponent } from '../../base-elements/fab-button/fab-button.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  standalone: true,
  imports: [
    TranslocoDirective,
    SidenavLayoutComponent,
    EventItemComponent,
    EmptyItemsComponent,
    FabButtonComponent,
    AsyncPipe,
  ],
})
export class EventsListComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  events$!: Observable<EventDto[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loading$.next(true);

    this.events$ = this.dataService.getEvents().pipe(take(1));

    this.events$.subscribe(
      (events: EventDto[]) => {
        setLocalEvents(events);
      },
      err => console.error(err),
      () => this.loading$.next(false)
    );
  }
}
