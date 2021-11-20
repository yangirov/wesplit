import { Component, Input, OnInit } from '@angular/core';
import { EventDto } from '../../../../models/Event';

@Component({
  selector: 'purchases-tab',
  templateUrl: './purchases-tab.component.html',
  styleUrls: ['./purchases-tab.component.scss'],
})
export class PurchasesTabComponent implements OnInit {
  @Input() event!: EventDto;

  constructor() {}

  ngOnInit(): void {}
}
