import { Component, Input } from '@angular/core';
import { EventDto, Purchase } from '../../../../../models/Event';
import { formatSum } from '../../../../../utils/Formatters';

@Component({
  selector: 'purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent {
  @Input() event!: EventDto;
  @Input() purchase!: Purchase;

  get purchaseSum(): string {
    return formatSum(this.purchase.sum);
  }

  get purchaseSubtitle(): string {
    const purchaseMembersCount = this.purchase.members.length;
    const eventMembersCount = this.event.members.length;

    return purchaseMembersCount === 1
      ? `1 из ${eventMembersCount} участвует`
      : `${purchaseMembersCount} из ${eventMembersCount} участвуют`;
  }
}
