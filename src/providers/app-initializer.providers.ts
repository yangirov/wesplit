import { inject as vercelInject } from '@vercel/analytics';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

export function initializeAppFactory() {
  return () =>
    vercelInject({
      debug: !environment.production,
      mode: isDevMode() ? 'development' : 'production',
    });
}

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    multi: true,
  },
];
