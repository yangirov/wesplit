import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.scss'],
})
export class ShareEventComponent {
  constructor(
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
    this.dialogRef.close();
    this.notificationService.open('Ссылка скопирована в буфер обмена');
  }
}
