import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, Subject } from 'rxjs';
import { SocketDataModule } from '../contexts/socket/data/socket-data.module';
import { Socket } from 'ngx-socket-io';

class MockGetAuthTokenUseCase {
  execute() {}
}

class MockListenReconnectSocketUseCase {
  execute() {
    return of();
  }
}

class MockMainSocketService {}
class MockWrappedSocket {}

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: Socket, useClass: MockSocketService }],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app 1', () => {
    expect(component).toBeTruthy();
  });
});
