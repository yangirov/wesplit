import { Component, Input, OnInit } from '@angular/core';
import { EventAction, EventDto } from '../../../../models/Event';

@Component({
  selector: 'actions-tab',
  templateUrl: './actions-tab.component.html',
  styleUrls: ['./actions-tab.component.scss'],
})
export class ActionsTabComponent implements OnInit {
  @Input() public event!: EventDto;

  public actions: EventAction[] = [];

  ngOnInit(): void {
    if (this.event?.actions) {
      this.actions = this.event?.actions.reverse();
    }
  }
}
