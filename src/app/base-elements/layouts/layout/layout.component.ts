import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { MatToolbar } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SpinnerComponent, MatToolbar, AsyncPipe],
})
export class LayoutComponent {
  @Input() loading$!: BehaviorSubject<boolean>;
}
