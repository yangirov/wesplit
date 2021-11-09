import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Event, MemberDebt } from '../../../../../models/Event';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'event-check',
  templateUrl: './event-check.component.html',
  styleUrls: ['./event-check.component.scss'],
})
export class EventCheckComponent implements OnInit {
  @Input() public event!: Event;
  @Input() public debts!: MemberDebt[];

  checkOpenState: boolean = false;

  constructor(private snackBar: MatSnackBar, private elRef: ElementRef) {}

  ngOnInit(): void {}

  check() {
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
      this.openAlert(
        'Устройство не поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами'
      );
    } else {
      this.openAlert('Чек скопирован в буфер обмена');
    }

    selection?.removeAllRanges();
  }

  openAlert(message: string, action: string = 'Закрыть') {
    this.snackBar.open(message, action, { duration: 2000 });
  }
}
