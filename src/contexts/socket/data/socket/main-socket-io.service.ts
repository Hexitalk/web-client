import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MainSocketService } from '../../domain/socket/main-socket.service';

@Injectable({
  providedIn: 'root',
})
export class MainSocketIoService extends MainSocketService {
  constructor(private socket: Socket) {
    super();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  reconnect(): void {
    this.socket.connect();
  }

  onReconnect(): Observable<any> {
    return this.socket.fromEvent('reconnect');
  }

  onConnect(): Observable<any> {
    return this.socket.fromEvent('connect');
  }

  onDisconnect(): Observable<any> {
    return this.socket.fromEvent('disconnect');
  }

  onError(): Observable<any> {
    return this.socket.fromEvent('connect_error');
  }
}
