import { Component, Input } from '@angular/core';

@Component({
  selector: 'separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent {
  @Input() position: string = '';
}
