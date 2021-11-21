import { Component, Input } from '@angular/core';
import { EventDto } from '../../../../models/Event';

@Component({
  selector: 'purchases-tab',
  templateUrl: './purchases-tab.component.html',
  styleUrls: ['./purchases-tab.component.scss'],
})
export class PurchasesTabComponent {
  @Input() event!: EventDto;
}
