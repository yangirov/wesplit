import { Component, Input } from '@angular/core';
import { EventDto, Purchase } from '../../../../../models/Event';
import { formatSum } from '../../../../../utils/Formatters';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent {
  @Input() event!: EventDto;
  @Input() purchase!: Purchase;

  constructor(private translocoService: TranslocoService) {}

  get purchaseSum(): string {
    const lang = this.translocoService.getActiveLang();
    return formatSum(lang, this.purchase.sum);
  }

  get purchaseSubtitle(): string {
    const purchaseMembersCount = this.purchase.members.length;
    const eventMembersCount = this.event.members.length;

    const lang = this.translocoService.getActiveLang();
    const ofText = this.translocoService.translate(
      'event.purchases.of',
      {},
      lang
    );
    const participateText = this.translocoService.translate(
      'event.purchases.participate',
      {},
      lang
    );

    return purchaseMembersCount === 1
      ? `1 ${ofText} ${eventMembersCount} ${participateText}`
      : `${purchaseMembersCount} ${ofText} ${eventMembersCount} ${participateText}`;
  }
}
