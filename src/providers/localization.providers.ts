import { provideTransloco } from '@ngneat/transloco';
import { environment } from '../environments/environment';
import { TranslocoLoaderService } from '../services';

export const localizationProviders = [
  provideTransloco({
    config: {
      availableLangs: ['en', 'ru'],
      defaultLang: 'ru',
      reRenderOnLangChange: true,
      prodMode: environment.production,
    },
    loader: TranslocoLoaderService,
  }),
];
