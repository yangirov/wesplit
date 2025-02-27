import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoDirective } from '@ngneat/transloco';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [TranslocoDirective, MatButton],
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}
