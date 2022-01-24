import { Component, Input } from '@angular/core';
import { ActionTypes, EventAction } from '../../../../../models/Event';
import * as moment from 'moment';
import { LocalizationService } from '../../../../../shared/localization.service';
import { CurrencyService } from '../../../../../shared/currency.service';

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
export class ActionItemComponent {
  @Input() public action!: EventAction;

  constructor(
    private localizationService: LocalizationService,
    public currencyService: CurrencyService
  ) {}

  get actionIcon(): string {
    return actionIcons[this.action.type];
  }

  get actionDate(): string {
    const lang = this.localizationService.getActiveLang();

    return this.action?.date
      ? moment(this.action?.date).locale(lang).fromNow()
      : '';
  }
}
