import { Component, Input } from '@angular/core';
import { EventDto, PurchasesSortFilter } from '../../../../models/Event';

@Component({
  selector: 'purchases-tab',
  templateUrl: './purchases-tab.component.html',
  styleUrls: ['./purchases-tab.component.scss'],
})
export class PurchasesTabComponent {
  @Input() event!: EventDto;

  @Input() sortFilter: PurchasesSortFilter = {
    key: 'date',
    order: 'desc',
  };

  get sortedPurchases() {
    return this.event.purchases.sort((a, b) => {
      let comparison = 0;

      if (this.sortFilter.key === 'date') {
        comparison = a.date - b.date;
      } else if (this.sortFilter.key === 'sum') {
        const sumA = parseFloat(a.sum);
        const sumB = parseFloat(b.sum);
        comparison = sumA - sumB;
      }

      return this.sortFilter.order === 'asc' ? comparison : -comparison;
    });
  }
}
