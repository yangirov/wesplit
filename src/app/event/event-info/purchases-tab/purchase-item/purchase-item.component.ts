import { Component, Input } from '@angular/core';
import { EventDto, Purchase } from '../../../../../models/Event';
import { formatSum } from '../../../../../utils/Formatters';
import { LocalizationService } from '../../../../../shared/settings/localization.service';

@Component({
  selector: 'purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent {
  @Input() event!: EventDto;
  @Input() purchase!: Purchase;

  constructor(private localizationService: LocalizationService) {}

  get purchaseSum(): string {
    const lang = this.localizationService.getActiveLang();
    return formatSum(lang, this.purchase.sum);
  }

  get purchaseSubtitle(): string {
    const purchaseMembersCount = this.purchase.members.length;
    const eventMembersCount = this.event.members.length;

    const ofText = this.localizationService.translate('event.purchases.of');
    const participateText = this.localizationService.translate(
      'event.purchases.participate'
    );

    return purchaseMembersCount === 1
      ? `1 ${ofText} ${eventMembersCount} ${participateText}`
      : `${purchaseMembersCount} ${ofText} ${eventMembersCount} ${participateText}`;
  }
}
