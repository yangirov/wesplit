import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(private translocoService: TranslocoService) {}

  initLocalization() {
    const lang =
      localStorage.getItem('lang') ?? this.translocoService.getDefaultLang();

    this.setActiveLang(lang);
  }

  load() {
    const lang = this.translocoService.getActiveLang();
    return this.translocoService.load(lang);
  }

  translate(key: string) {
    const lang = this.translocoService.getActiveLang();
    return this.translocoService.translate(key, {}, lang);
  }

  getActiveLang() {
    return this.translocoService.getActiveLang();
  }

  setActiveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  getDefaultLang() {
    return this.translocoService.getDefaultLang();
  }
}
