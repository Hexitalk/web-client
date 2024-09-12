import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from '../contexts/shared/services/transloco-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from '../contexts/shared/interceptors/auth.interceptor';
import { AuthDataModule } from '../contexts/auth/data/auth-data.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(/*withInterceptors([authInterceptor])*/),
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule, AuthDataModule]),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    // provideAuthService()
  ],
};
