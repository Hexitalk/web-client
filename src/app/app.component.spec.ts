import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, Subject } from 'rxjs';
import { SocketDataModule } from '../contexts/socket/data/socket-data.module';
import { Socket } from 'ngx-socket-io';
import { GetAuthTokenUseCase } from '../contexts/auth/use-cases/get-auth-token.usecase';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ListenReconnectSocketUseCase } from '../contexts/socket/use-cases/listen-reconnect-socket.usecase';
import { ListenConnectSocketUseCase } from '../contexts/socket/use-cases/listen-connect-socket.usecase';
import { ListenDisconnectSocketUseCase } from '../contexts/socket/use-cases/listen-disconnect-socket.usecase';
import { AuthSocketLoginUseCase } from '../contexts/auth/use-cases/auth-socket-login.usecase';

class MockGetAuthTokenUseCase {
  execute() {}
}

class MockListenReconnectSocketUseCase {
  execute() {
    return of();
  }
}

class MockMainSocketService {
  execute() {
    return of(undefined); // Simulate a disconnect event
  }
}
class MockWrappedSocket {
  execute() {
    return of();
  }
}

export class MockSocketService {
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

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let component: AppComponent;

  let router: Router;
  let primengConfig: PrimeNGConfig;
  let getAuthTokenUseCase: GetAuthTokenUseCase;
  let authSocketLoginUseCase: AuthSocketLoginUseCase;
  let listenConnectSocketUseCase: ListenConnectSocketUseCase;
  let listenReconnectSocketUseCase: ListenReconnectSocketUseCase;
  let listenDisconnectSocketUseCase: ListenDisconnectSocketUseCase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Socket, useClass: MockSocketService },
        {
          provide: ListenDisconnectSocketUseCase,
          useClass: MockMainSocketService,
        },
        //   { provide: ListenConnectSocketUseCase, useClass: MockListenConnectSocketUseCase },
        //   { provide: ListenReconnectSocketUseCase, useClass: MockListenReconnectSocketUseCase },
        //   { provide: GetAuthTokenUseCase, useClass: MockGetAuthTokenUseCase },
        //   { provide: AuthSocketLoginUseCase, useClass: MockAuthSocketLoginUseCase }
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    primengConfig = fixture.debugElement.injector.get(PrimeNGConfig);
    getAuthTokenUseCase =
      fixture.debugElement.injector.get(GetAuthTokenUseCase);
    authSocketLoginUseCase = fixture.debugElement.injector.get(
      AuthSocketLoginUseCase
    );
    listenConnectSocketUseCase = fixture.debugElement.injector.get(
      ListenConnectSocketUseCase
    );
    listenReconnectSocketUseCase = fixture.debugElement.injector.get(
      ListenReconnectSocketUseCase
    );
    listenDisconnectSocketUseCase = fixture.debugElement.injector.get(
      ListenDisconnectSocketUseCase
    ) as unknown as ListenDisconnectSocketUseCase;
  });

  it('should create the app 1', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and execute necessary methods', () => {
    const ngOnInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
    const ngRedirectAuthSpy = spyOn(component, 'redirectAuth').and.callFake(
      () => new Promise<void>((solve) => solve)
    );
    const getAuthTokenSpy = spyOn(
      getAuthTokenUseCase,
      'execute'
    ).and.returnValue('mockToken');
    const authSocketLoginSpy = spyOn(
      authSocketLoginUseCase,
      'execute'
    ).and.returnValue();
    const listenConnectSpy = spyOn(
      listenConnectSocketUseCase,
      'execute'
    ).and.returnValue(of());
    const listenReconnectSpy = spyOn(
      listenReconnectSocketUseCase,
      'execute'
    ).and.returnValue(of());
    const listenDisconnectSpy = spyOn(
      listenDisconnectSocketUseCase,
      'execute'
    ).and.returnValue(of(undefined, undefined));

    component.ngOnInit();
    fixture.detectChanges();

    expect(ngOnInitSpy).toHaveBeenCalled();
    expect(ngRedirectAuthSpy).toHaveBeenCalled();
    // expect(getAuthTokenSpy).toHaveBeenCalled();
    // expect(authSocketLoginSpy).toHaveBeenCalled();
    expect(listenConnectSpy).toHaveBeenCalled();
    expect(listenReconnectSpy).toHaveBeenCalled();
    expect(listenDisconnectSpy).toHaveBeenCalled();
  });
});
