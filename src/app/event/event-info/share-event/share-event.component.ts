import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/notification.service';
import { LocalizationService } from '../../../../shared/settings/localization.service';
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
    @Inject(MAT_DIALOG_DATA) public event: EventDto
  ) {}

  get eventLink(): string {
    return `${window.location.origin}/events/${this.event.id}/login?uid=${this.event.ownerUserId}`;
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
