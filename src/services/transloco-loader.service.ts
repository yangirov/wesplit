import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslocoLoaderService implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/i18n/${lang}.json`);
  }
}
