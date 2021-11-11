import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'share-event',
  templateUrl: './share-event.component.html',
  styleUrls: ['./share-event.component.scss'],
})
export class ShareEventComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShareEventComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit(): void {}

  eventLink() {
    return `${window.location.origin}/events/${this.id}`;
  }

  onLaterClick() {
    this.dialogRef.close();
  }

  onCopyClick() {
    this.dialogRef.close();
    this.snackBar.open('Ссылка скопирована в буфер обмена', 'Закрыть  ', {
      duration: 2000,
    });
  }
}
