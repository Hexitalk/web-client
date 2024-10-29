import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { GetAuthTokenUseCase } from '../contexts/auth/use-cases/get-auth-token.usecase';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { ListenReconnectSocketUseCase } from '../contexts/socket/use-cases/listen-reconnect-socket.usecase';
import { ListenConnectSocketUseCase } from '../contexts/socket/use-cases/listen-connect-socket.usecase';
import { ListenDisconnectSocketUseCase } from '../contexts/socket/use-cases/listen-disconnect-socket.usecase';
import { AuthSocketLoginUseCase } from '../contexts/auth/use-cases/auth-socket-login.usecase';
import { mockSocketService } from './testing/mock-services';

class MockListenDisconnectSocketUseCase {
  execute() {
    return of(undefined);
  }
}

describe('AppComponent', () => {
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
        { provide: Socket, useClass: mockSocketService },
        {
          provide: ListenDisconnectSocketUseCase,
          useClass: MockListenDisconnectSocketUseCase,
        },
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

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call authSocketLoginUseCase on socket connect/reconnect event', () => {
    const ngOnInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
    const redirectAuthSpy = spyOn(component, 'redirectAuth').and.callFake(
      () => new Promise<void>((solve) => solve)
    );
    const listenConnectSpy = spyOn(
      listenConnectSocketUseCase,
      'execute'
    ).and.returnValue(of(undefined));
    const listenReconnectSpy = spyOn(
      listenReconnectSocketUseCase,
      'execute'
    ).and.returnValue(of());
    const authSocketLoginSpy = spyOn(
      authSocketLoginUseCase,
      'execute'
    ).and.returnValue();

    component.ngOnInit();

    expect(listenConnectSpy).toHaveBeenCalled();
    expect(listenReconnectSpy).toHaveBeenCalled();
    expect(authSocketLoginSpy).toHaveBeenCalled();
  });

  it('should call redirectAuth on ngOnInit', () => {
    const ngOnInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
    const redirectAuthSpy = spyOn(component, 'redirectAuth').and.callFake(
      () => new Promise<void>((solve) => solve)
    );

    component.ngOnInit();

    expect(redirectAuthSpy).toHaveBeenCalled();
  });

  it('should call router navigate on redirectAuth when token is not empty', () => {
    const navigateSpy = spyOn(router, 'navigate').and.callFake(
      () => new Promise<boolean>((solve) => solve(true))
    );

    const getAuthTokenUseCaseSpy = spyOn(
      getAuthTokenUseCase,
      'execute'
    ).and.returnValue('mock-token');

    component.redirectAuth();

    expect(navigateSpy).toHaveBeenCalled();
  });

  it('shouldn´t call router navigate on redirectAuth when token is empty', () => {
    const navigateSpy = spyOn(router, 'navigate').and.callFake(
      () => new Promise<boolean>((solve) => solve(true))
    );

    const getAuthTokenUseCaseSpy = spyOn(
      getAuthTokenUseCase,
      'execute'
    ).and.returnValue('');

    component.redirectAuth();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should call ngOnDestroy and complete the destroy$ subject', () => {
    const ngOnDestroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();
    const completeSpy = spyOn(
      component['destroy$'],
      'complete'
    ).and.callThrough();

    component.ngOnDestroy();

    expect(ngOnDestroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

// xit('should call ngOnInit and execute necessary methods', () => {
//   const ngOnInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
//   const redirectAuthSpy = spyOn(component, 'redirectAuth').and.callFake(
//     () => new Promise<void>((solve) => solve)
//   );
//   const getAuthTokenSpy = spyOn(
//     getAuthTokenUseCase,
//     'execute'
//   ).and.returnValue('mockToken');
//   const authSocketLoginSpy = spyOn(
//     authSocketLoginUseCase,
//     'execute'
//   ).and.returnValue();
//   const listenConnectSpy = spyOn(
//     listenConnectSocketUseCase,
//     'execute'
//   ).and.returnValue(of(undefined));
//   const listenReconnectSpy = spyOn(
//     listenReconnectSocketUseCase,
//     'execute'
//   ).and.returnValue(of());
//   const listenDisconnectSpy = spyOn(
//     listenDisconnectSocketUseCase,
//     'execute'
//   ).and.returnValue(of(undefined, undefined));

//   component.ngOnInit();
//   fixture.detectChanges();

//   expect(ngOnInitSpy).toHaveBeenCalled();
//   expect(redirectAuthSpy).toHaveBeenCalled();
//   // expect(getAuthTokenSpy).toHaveBeenCalled();
//   expect(authSocketLoginSpy).toHaveBeenCalled();
//   expect(listenConnectSpy).toHaveBeenCalled();
//   expect(listenReconnectSpy).toHaveBeenCalled();
//   expect(listenDisconnectSpy).toHaveBeenCalled();
// });
