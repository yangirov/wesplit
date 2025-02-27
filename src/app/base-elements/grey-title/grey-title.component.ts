import { Component, Input } from '@angular/core';

@Component({
  selector: 'grey-title',
  templateUrl: './grey-title.component.html',
  styleUrls: ['./grey-title.component.scss'],
  standalone: true,
})
export class GreyTitleComponent {
  @Input() text!: string;
}
