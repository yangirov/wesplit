import { Component, Input, OnInit } from '@angular/core';
import {
  ActionTypes,
  DebtTypes,
  EventDto,
  MemberDebt,
} from '../../../../models/Event';
import {
  getEventBalance,
  getEventsMembersDebts,
} from '../../../../utils/BalanceCalculator';
import { DataService } from '../../../../shared/data.service';

@Component({
  selector: 'debts-tab',
  templateUrl: './debts-tab.component.html',
  styleUrls: ['./debts-tab.component.scss'],
})
export class DebtsTabComponent implements OnInit {
  @Input() public event!: EventDto;

  allDebts!: MemberDebt[];
  positiveDebts!: MemberDebt[];
  negativeDebts!: MemberDebt[];
  othersDebts!: MemberDebt[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const balance = getEventBalance(this.event);
    const debts = getEventsMembersDebts(balance, this.event);
    this.allDebts = debts;

    const currentUser = this.dataService.getCurrentUser(this.event.id);

    this.positiveDebts = debts
      .filter((debt) => currentUser === debt.to)
      .map((x) => ({
        sum: Math.abs(Math.round(x.sum)),
        from: x.from,
        to: `${x.to} ${currentUser === x.to ? '(Вы)' : ''}`.trim(),
      }));

    this.negativeDebts = debts
      .filter((debt) => currentUser === debt.from)
      .map((x) => ({
        sum: Math.abs(Math.round(x.sum)),
        from: `${x.from} ${currentUser === x.from ? '(Вы)' : ''}`.trim(),
        to: x.to,
      }));

    this.othersDebts = debts
      .filter((debt) => currentUser !== debt.from && currentUser !== debt.to)
      .map((x) => ({
        sum: Math.abs(Math.round(x.sum)),
        from: x.from,
        to: x.to,
      }));
  }

  public get debtTypes(): typeof DebtTypes {
    return DebtTypes;
  }

  get hasReturnedDebts(): boolean {
    if (this.event.actions) {
      return (
        this.event.actions.filter((x) => x.type == ActionTypes.GiveBack)
          .length > 0
      );
    }

    return false;
  }
}
