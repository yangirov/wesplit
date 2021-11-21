import { Component, Input } from '@angular/core';

@Component({
  selector: 'fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent {
  @Input() link!: string;
  @Input() icon!: string;
}
