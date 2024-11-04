import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/i18n/${lang}.json`);
  }

  // If load json file fail, maybe the problem is to change to this method who load the file via relative path
  // getTranslation(langPath: string) {
  //   return this.http.get(`./assets/i18n/${langPath}.json`);
  // }
}
