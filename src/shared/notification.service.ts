import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {}

  open(text: string, action: string | null = null, duration = 2000) {
    if (!action) {
      const lang = this.translocoService.getActiveLang();

      this.translocoService.load(lang).subscribe(() => {
        action = this.translocoService.translate('common.close', {}, lang);
        this.snackBar.open(text, action || undefined, { duration });
      });
    } else {
      this.snackBar.open(text, action || undefined, { duration });
    }
  }
}
