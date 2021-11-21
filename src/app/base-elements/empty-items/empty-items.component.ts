import { Component, Input } from '@angular/core';

@Component({
  selector: 'empty-items',
  templateUrl: './empty-items.component.html',
  styleUrls: ['./empty-items.component.scss'],
})
export class EmptyItemsComponent {
  @Input() icon!: string;
  @Input() text!: string;
}
