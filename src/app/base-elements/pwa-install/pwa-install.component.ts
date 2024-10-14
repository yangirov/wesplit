import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-pwa-install',
  templateUrl: './pwa-install.component.html',
  styleUrls: ['./pwa-install.component.scss'],
})
export class PwaInstallComponent {
  constructor(public dialogRef: MatDialogRef<PwaInstallComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
