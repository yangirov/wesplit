import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'empty-items',
  templateUrl: './empty-items.component.html',
  styleUrls: ['./empty-items.component.scss'],
  standalone: true,
  imports: [MatIcon],
})
export class EmptyItemsComponent {
  @Input() icon!: string;
  @Input() text!: string;
}
