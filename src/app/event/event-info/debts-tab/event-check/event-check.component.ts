import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EventDto, MemberDebt } from '../../../../../models/Event';
import { NotificationService } from '../../../../../shared/notification.service';

@Component({
  selector: 'event-check',
  templateUrl: './event-check.component.html',
  styleUrls: ['./event-check.component.scss'],
})
export class EventCheckComponent implements OnInit {
  @Input() public event!: EventDto;
  @Input() public debts!: MemberDebt[];

  checkOpenState: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {}

  get check(): string[] {
    return this.debts?.map(
      (debt) => `${debt.from} → ${debt.to}   ${Math.abs(debt?.sum || 0)} руб.`
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
        'Устройство не поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами'
      );
    } else {
      this.notificationService.open('Чек скопирован в буфер обмена');
    }

    selection?.removeAllRanges();
  }
}
