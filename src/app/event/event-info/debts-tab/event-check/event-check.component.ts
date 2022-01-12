import { Component, ElementRef, Input } from '@angular/core';
import { EventDto, MemberDebt } from '../../../../../models/Event';
import { LocalizationService } from '../../../../../shared/localization.service';
import { ClipboardService } from '../../../../../shared/clipboard.service';

@Component({
  selector: 'event-check',
  templateUrl: './event-check.component.html',
  styleUrls: ['./event-check.component.scss'],
})
export class EventCheckComponent {
  @Input() public event!: EventDto;
  @Input() public debts!: MemberDebt[];

  checkOpenState: boolean = false;

  constructor(
    private elRef: ElementRef,
    private localizationService: LocalizationService,
    private clipboardService: ClipboardService
  ) {}

  get check(): string[] {
    const currencyText = this.localizationService.translate('common.currency');

    return this.debts?.map(
      (debt) =>
        `${debt.from} → ${debt.to}   ${Math.abs(
          debt?.sum || 0
        )} ${currencyText}`
    );
  }

  copyCheck() {
    this.clipboardService.copyFromElement(
      this.elRef,
      '.balance-check-content__debts',
      'event.balance.clipboard.success',
      'event.balance.clipboard.failed'
    );
  }
}
