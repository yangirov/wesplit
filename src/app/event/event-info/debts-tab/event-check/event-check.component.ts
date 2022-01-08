import { Component, ElementRef, Input } from '@angular/core';
import { EventDto, MemberDebt } from '../../../../../models/Event';
import { NotificationService } from '../../../../../shared/notification.service';
import { LocalizationService } from '../../../../../shared/settings/localization.service';

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
    private notificationService: NotificationService,
    private elRef: ElementRef,
    private localizationService: LocalizationService
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
    const checkContent = this.elRef.nativeElement.querySelector(
      '.balance-check-content__debts'
    );

    const range = document.createRange();
    const selection = window.getSelection();
    selection?.removeAllRanges();

    range.selectNode(checkContent);
    selection?.addRange(range);

    if (!document.execCommand('copy')) {
      this.notificationService.open(
        this.localizationService.translate('event.balance.clipboard.failed')
      );
    } else {
      this.notificationService.open(
        this.localizationService.translate('event.balance.clipboard.success')
      );
    }

    selection?.removeAllRanges();
  }
}
