import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  loading: boolean = true;
  events: Event[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents().subscribe(
      (event: Event) => {
        this.events.push(event);
        this.loading = false;
      },
      (err) => console.error(err),
      () => (this.loading = false)
    );
  }
}
