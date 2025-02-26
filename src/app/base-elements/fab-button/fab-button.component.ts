import { Component, Input } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  standalone: true,
  imports: [MatFabButton, RouterLink, MatIcon],
})
export class FabButtonComponent {
  @Input() link!: string;
  @Input() icon!: string;
}
