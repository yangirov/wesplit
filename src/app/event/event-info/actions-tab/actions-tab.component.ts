import { Component, Input, OnInit } from '@angular/core';
import { Event, EventAction } from '../../../../models/Event';

@Component({
  selector: 'actions-tab',
  templateUrl: './actions-tab.component.html',
  styleUrls: ['./actions-tab.component.scss'],
})
export class ActionsTabComponent implements OnInit {
  @Input() public event!: Event;

  public actions: EventAction[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.event?.actions) {
      this.actions = this.event?.actions.reverse();
    }
  }
}
