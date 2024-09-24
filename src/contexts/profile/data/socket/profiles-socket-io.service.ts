import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ProfileSocketService } from '../../domain/socket/profiles-socket.service';
import { ProfileModel } from '../../domain/models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileSocketIoService extends ProfileSocketService {
  constructor(private socket: Socket) {
    super();
  }

  listenProfileInfo(): Observable<ProfileModel> {
    return this.socket.fromEvent('profiles.profile-info');
  }
}
