import { Component, Input, OnInit } from '@angular/core';
import { ActionTypes, EventAction } from '../../../../../models/Event';
import * as moment from 'moment';

export const actionIcons: { [key in ActionTypes]: string } = {
  [ActionTypes.CreateEvent]: 'calendar_today',
  [ActionTypes.ChangeEventName]: 'create',
  [ActionTypes.ChangeEventDate]: 'create',
  [ActionTypes.AddMemberToEvent]: 'person',
  [ActionTypes.AddMembersToEvent]: 'person',
  [ActionTypes.RemoveMemberFromEvent]: 'delete_sweep',
  [ActionTypes.AddPurchase]: 'add_shopping_cart',
  [ActionTypes.DeletePurchase]: 'create',
  [ActionTypes.AddMemberToPurchase]: 'create',
  [ActionTypes.AddMembersToPurchase]: 'create',
  [ActionTypes.RemoveMemberFromPurchase]: 'create',
  [ActionTypes.GiveBackPartially]: 'check_circle',
  [ActionTypes.GiveBack]: 'check',
};

@Component({
  selector: 'action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() public action!: EventAction;

  constructor() {}

  ngOnInit(): void {}

  actionIcon(): string {
    return actionIcons[this.action.type];
  }

  actionDate(): string {
    return this.action?.date
      ? moment(this.action?.date).locale('ru').fromNow()
      : '';
  }
}
