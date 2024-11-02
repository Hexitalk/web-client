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
import { AuthDataModule } from '../contexts/auth/data/auth-data.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment.prod';

const configSocketIo: SocketIoConfig = {
  url: `${environment.socketUrl}`,
  options: {
    transports: ['websocket'],
    reconnection: true,
    extraHeaders: {
      Authorization: `Bearer `,
    },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(/*withInterceptors([authInterceptor])*/),
    provideRouter(routes),
    importProvidersFrom([
      BrowserAnimationsModule,
      AuthDataModule,
      SocketIoModule.forRoot(configSocketIo),
    ]),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'fr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
