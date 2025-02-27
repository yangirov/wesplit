import { Component, Input, OnInit } from '@angular/core';
import { EventAction, EventDto } from '../../../../models/Event';
import { TranslocoDirective } from '@ngneat/transloco';
import { ActionItemComponent } from './action-item/action-item.component';
import { EmptyItemsComponent } from '../../../base-elements/empty-items/empty-items.component';

@Component({
  selector: 'actions-tab',
  templateUrl: './actions-tab.component.html',
  styleUrls: ['./actions-tab.component.scss'],
  standalone: true,
  imports: [TranslocoDirective, ActionItemComponent, EmptyItemsComponent],
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
