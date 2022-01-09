import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/notification.service';
import { LocalizationService } from '../../../../shared/localization.service';
import { EventDto } from '../../../../models/Event';

@Component({
  selector: 'share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.scss'],
})
export class ShareEventComponent {
  constructor(
    private localizationService: LocalizationService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ShareEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; uid: string }
  ) {}

  get eventLink(): string {
    return `${window.location.origin}/events/${this.data.id}/login?uid=${this.data.uid}`;
  }

  onLaterClick() {
    this.dialogRef.close();
  }

  onCopyClick() {
    const copiedText = this.localizationService.translate('event.share.copied');

    this.dialogRef.close();
    this.notificationService.open(copiedText);
  }
}
