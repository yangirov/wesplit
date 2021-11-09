import { Component, Input, OnInit } from '@angular/core';
import { Event, MemberDebt } from '../../../../models/Event';
import {
  getEventBalance,
  getEventsMembersDebts,
} from '../../../../utils/BalanceCalculator';

@Component({
  selector: 'debts-tab',
  templateUrl: './debts-tab.component.html',
  styleUrls: ['./debts-tab.component.scss'],
})
export class DebtsTabComponent implements OnInit {
  @Input() public event!: Event;

  public debts!: MemberDebt[];

  constructor() {}

  ngOnInit(): void {
    const balance = getEventBalance(this.event);
    const debts = getEventsMembersDebts(balance, this.event);
    this.debts = debts;
  }
}
