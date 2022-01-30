import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(
    private translocoService: TranslocoService,
    private ccService: NgcCookieConsentService
  ) {}

  initLocalization() {
    const lang = localStorage.getItem('lang') ?? this.getDefaultLang();

    this.setActiveLang(lang);

    this.setCookieTranslation();
  }

  load() {
    const lang = this.getActiveLang();
    return this.translocoService.load(lang);
  }

  translate(key: string) {
    const lang = this.getActiveLang();
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

  getTranslationSection(key: string): { [key: string]: string } {
    let translation = {};

    this.translocoService
      .selectTranslateObject(key, {}, this.getActiveLang())
      .pipe(take(1))
      .subscribe((data) => {
        translation = data;
      });

    return translation;
  }

  setCookieTranslation() {
    this.translocoService
      .selectTranslateObject('cookie', {}, this.getActiveLang())
      .pipe(take(1))
      .subscribe((cookieTranslation) => {
        this.ccService.getConfig().content = cookieTranslation;
        this.ccService.destroy();
        this.ccService.init(this.ccService.getConfig());
      });
  }
}
