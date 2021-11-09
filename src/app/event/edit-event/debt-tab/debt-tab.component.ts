import { Component, Input, OnInit } from '@angular/core';
import { Event, MemberDebt } from '../../../../models/Event';
import {
  getEventBalance,
  getEventsMembersDebts,
} from '../../../../utils/BalanceCalculator';

@Component({
  selector: 'debt-tab',
  templateUrl: './debt-tab.component.html',
  styleUrls: ['./debt-tab.component.scss'],
})
export class DebtTabComponent implements OnInit {
  @Input() public event!: Event;

  public debts!: MemberDebt[];

  constructor() {}

  ngOnInit(): void {
    const balance = getEventBalance(this.event);
    this.debts = getEventsMembersDebts(balance, this.event);
  }
}
