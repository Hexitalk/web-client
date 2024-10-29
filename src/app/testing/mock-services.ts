import { of, Subject } from 'rxjs';

export const mockTranslocoService = {
  langChanges$: of('en'),
  getActiveLang: () => 'en',
  translate: (key: string) => key,
  setActiveLang: () => {},
  selectTranslate: () => of('translated-value'),
  config: {
    reRenderOnLangChange: true,
    availableLangs: ['en', 'es'],
    defaultLang: 'en',
  },
};

export const mockActivatedRoute = {
  snapshot: { paramMap: { get: () => 'some-value' } },
  paramMap: of({ get: () => 'some-value' }),
};

export class mockSocketService {
  private mockSubject = new Subject<any>();

  emit(eventName: string, data?: any) {
    this.mockSubject.next({ eventName, data });
  }

  fromEvent<T>(eventName: string) {
    return this.mockSubject.asObservable();
  }

  connect() {}

  disconnect() {}
}
