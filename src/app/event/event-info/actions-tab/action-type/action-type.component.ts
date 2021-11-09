import { Component, Input, OnInit } from '@angular/core';
import { ActionTypes, EventAction } from '../../../../../models/Event';

@Component({
  selector: 'action-type',
  templateUrl: './action-type.component.html',
  styleUrls: ['./action-type.component.scss'],
})
export class ActionTypeComponent implements OnInit {
  @Input() public action!: EventAction;

  public actionType!: string;

  constructor() {}

  ngOnInit(): void {
    this.actionType = ActionTypes[this.action.type];
  }
}
