import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  loading: boolean = true;
  events: Event[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents().subscribe((event: Event) => {
      this.events.push(event);
      this.loading = false;
    });
  }
}
