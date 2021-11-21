import { Component, Input } from '@angular/core';
import { ActionTypes, EventAction } from '../../../../../models/Event';

@Component({
  selector: 'action-type',
  templateUrl: './action-type.component.html',
  styleUrls: ['./action-type.component.scss'],
})
export class ActionTypeComponent {
  @Input() public action!: EventAction;

  public get actionTypes(): typeof ActionTypes {
    return ActionTypes;
  }
}
