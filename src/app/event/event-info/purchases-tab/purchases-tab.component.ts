import { Component, Input, OnInit } from '@angular/core';
import { EventDto, PurchasesSortFilter } from '../../../../models/Event';
import { LocalizationService } from '../../../../shared/localization.service';
import { formatSum } from '../../../../utils/Formatters';
import { CurrencyService } from '../../../../shared/currency.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'purchases-tab',
  templateUrl: './purchases-tab.component.html',
  styleUrls: ['./purchases-tab.component.scss'],
})
export class PurchasesTabComponent implements OnInit {
  @Input() event!: EventDto;

  lang!: string;
  sortFilter: PurchasesSortFilter = {
    key: 'date',
    order: 'desc',
  };
  sortForm!: FormGroup;

  constructor(
    private localizationService: LocalizationService,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {
    this.lang = this.localizationService.getActiveLang();

    this.sortForm = this.formBuilder.group({
      key: ['date'],
      order: ['desc'],
    });
  }

  ngOnInit() {
    this.sortForm.valueChanges.subscribe(filter => {
      this.sortFilter = filter;
    });
  }

  get sortedPurchases() {
    return this.event.purchases.sort((a, b) => {
      let comparison = 0;

      if (this.sortFilter.key === 'date') {
        comparison = a.date - b.date;
      } else if (this.sortFilter.key === 'sum') {
        comparison = parseFloat(a.sum) - parseFloat(b.sum);
      }

      return this.sortFilter.order === 'asc' ? comparison : -comparison;
    });
  }

  get allSum() {
    const sum = this.event.purchases.reduce((acc, p) => acc + parseFloat(p.sum), 0);

    const formatedSum = formatSum(this.lang, Number(sum));
    const currency = this.currencyService.getCurrencyAcronym();

    return `${formatedSum} ${currency}`;
  }
}
