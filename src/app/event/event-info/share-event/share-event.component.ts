import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/notification.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.scss'],
})
export class ShareEventComponent {
  constructor(
    private translocoService: TranslocoService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ShareEventComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  get eventLink(): string {
    return `${window.location.origin}/events/${this.id}/login`;
  }

  onLaterClick() {
    this.dialogRef.close();
  }

  onCopyClick() {
    const lang = this.translocoService.getActiveLang();
    const copiedText = this.translocoService.translate(
      'event.share.copied',
      {},
      lang
    );

    this.dialogRef.close();
    this.notificationService.open(copiedText);
  }
}
