import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { LocalizationService } from './localization.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private localizationService: LocalizationService
  ) {}

  open(text: string, action: string | null = null, duration = 2000) {
    if (!action) {
      this.localizationService.load().subscribe(() => {
        action = this.localizationService.translate('common.close');
        this.snackBar.open(text, action || undefined, { duration });
      });
    } else {
      this.snackBar.open(text, action || undefined, { duration });
    }
  }
}
