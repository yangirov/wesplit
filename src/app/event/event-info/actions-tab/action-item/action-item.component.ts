import { Component, Input, OnInit } from '@angular/core';
import { ActionTypes, Event, EventAction } from '../../../../../models/Event';
import * as moment from 'moment';

export const actionIcons: { [key: string]: string } = {
  CreateEvent: 'calendar_today',
  ChangeEventName: 'create',
  ChangeEventDate: 'create',
  AddParticipantToEvent: 'person',
  AddParticipantsToEvent: 'person',
  RemoveParticipantFromEvent: 'delete_sweep',
  AddPurchase: 'add_shopping_cart',
  DeletePurchase: 'create',
  AddParticipantToPurchase: 'create',
  AddParticipantsToPurchase: 'create',
  RemoveParticipantFromPurchase: 'create',
  GiveBackPartially: 'check_circle',
  GiveBack: 'check',
};

@Component({
  selector: 'action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() public action!: EventAction;

  public actionType!: string;

  constructor() {}

  ngOnInit(): void {
    this.actionType = ActionTypes[this.action.type];
  }

  actionIcon(): string {
    return actionIcons[this.actionType];
  }

  actionDate(): string {
    return this.action?.date
      ? moment(this.action?.date).locale('ru').fromNow()
      : '';
  }
}
