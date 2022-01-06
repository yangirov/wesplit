import { Component, ElementRef, Input } from '@angular/core';
import { EventDto, MemberDebt } from '../../../../../models/Event';
import { NotificationService } from '../../../../../shared/notification.service';
import { TranslocoService } from '@ngneat/transloco';

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
    private translocoService: TranslocoService
  ) {}

  get check(): string[] {
    const lang = this.translocoService.getActiveLang();
    const currencyText = this.translocoService.translate(
      'common.currency',
      {},
      lang
    );

    return this.debts?.map(
      (debt) =>
        `${debt.from} → ${debt.to}   ${Math.abs(
          debt?.sum || 0
        )} ${currencyText}`
    );
  }

  copyCheck() {
    const lang = this.translocoService.getActiveLang();

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
        this.translocoService.translate(
          'event.balance.clipboard.failed',
          {},
          lang
        )
      );
    } else {
      this.notificationService.open(
        this.translocoService.translate(
          'event.balance.clipboard.success',
          {},
          lang
        )
      );
    }

    selection?.removeAllRanges();
  }
}
