import { Observable } from 'rxjs';

export abstract class MainSocketService {
  abstract disconnect(): void;
  abstract reconnect(): void;
  abstract onReconnect(): Observable<any>;
  abstract onConnect(): Observable<any>;
  abstract onError(): Observable<any>;
  abstract onDisconnect(): Observable<any>;
  abstract updateToken(token: string): void;
}
