import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, tap } from 'rxjs';
import { HubSocketService } from '../../domain/socket/hub-socket.service';
import { HubModel } from '../../domain/models/hub.model';
import { HubImplementationRepositoryMapper } from '../repositories/mappers/hub-repository.mapper';
import { HubEntity } from '../repositories/entities/hub-entity';

@Injectable({
  providedIn: 'root',
})
export class HubSocketIoService extends HubSocketService {
  hubMapper = new HubImplementationRepositoryMapper();

  constructor(private socket: Socket) {
    super();
  }

  listenHubUpdate(): Observable<HubModel> {
    return this.socket.fromEvent<HubEntity>('hub.hub-update').pipe(
      tap(console.log),
      map((res) => {
        return this.hubMapper.mapFrom(res);
      })
    );
  }
}
