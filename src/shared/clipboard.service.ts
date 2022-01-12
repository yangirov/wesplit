import { ElementRef, Injectable } from '@angular/core';
import { LocalizationService } from './localization.service';
import { NotificationService } from './notification.service';

const navigator = window.navigator as any;

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor(
    private localizationService: LocalizationService,
    private notificationService: NotificationService
  ) {}

  public copyFromText(
    text: string,
    successLocalizationKey: string = 'clipboard.success',
    failedLocalizationText: string = 'clipboard.failed'
  ) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.notificationService.open(
          this.localizationService.translate(successLocalizationKey)
        );
      })
      .catch((err: any) => {
        this.notificationService.open(
          this.localizationService.translate(failedLocalizationText)
        );
      });
  }

  public copyFromElement(
    elRef: ElementRef,
    selector: string,
    successLocalizationKey: string = 'clipboard.success',
    failedLocalizationText: string = 'clipboard.failed'
  ) {
    const checkContent = elRef.nativeElement.querySelector(selector);

    const range = document.createRange();
    const selection = window.getSelection();
    selection?.removeAllRanges();

    range.selectNode(checkContent);
    selection?.addRange(range);

    if (!document.execCommand('copy')) {
      this.notificationService.open(
        this.localizationService.translate(failedLocalizationText)
      );
    } else {
      this.notificationService.open(
        this.localizationService.translate(successLocalizationKey)
      );
    }

    selection?.removeAllRanges();
  }
}
