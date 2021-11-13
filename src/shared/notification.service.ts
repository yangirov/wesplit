import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  open(text: string, action = 'Закрыть', duration = 2000) {
    this.snackBar.open(text, action, { duration });
  }
}
