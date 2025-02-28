import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoDirective } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pwa-install',
  templateUrl: './pwa-install.component.html',
  styleUrls: ['./pwa-install.component.scss'],
  standalone: true,
  imports: [TranslocoDirective, MatIcon],
})
export class PwaInstallComponent {
  constructor(public dialogRef: MatDialogRef<PwaInstallComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
