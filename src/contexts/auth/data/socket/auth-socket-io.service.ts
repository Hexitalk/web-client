import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthSocketService } from '../../domain/socket/auth-socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthSocketIoService extends AuthSocketService {
  constructor(private socket: Socket) {
    super();
  }

  login(token: string): void {
    this.socket.emit('auth.login-socket', { token });
  }
}
