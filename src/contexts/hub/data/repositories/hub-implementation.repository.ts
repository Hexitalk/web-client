import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubModel } from '../../domain/models/hub.model';
import { environment } from '../../../../environments/environment.prod';
import { HubRepository } from '../../domain/repositories/hub.repository';
import { HubImplementationRepositoryMapper } from './mappers/hub-repository.mapper';
import { HubEntity } from './entities/hub-entity';
import { HubChatStateEnum } from '../../domain/enums';
import { HubChatModel } from '../../domain/models/hub-chat.model';
import { HubChatImplementationRepositoryMapper } from './mappers/hub-chat-repository.mapper';
import { HubChatEntity } from './entities/hub-chat.entity';

@Injectable({
  providedIn: 'root',
})
export class HubImplementationRepository extends HubRepository {
  hubMapper = new HubImplementationRepositoryMapper();
  hubChatMapper = new HubChatImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getHub(): Observable<HubModel> {
    return this.http
      .post<{ hub: HubEntity }>(`${environment.apiUrl}/hub/get-hub`, {})
      .pipe(
        map((res) => {
          return this.hubMapper.mapFrom(res.hub);
        })
      );
  }

  setHubChatState(params: {
    slot: number;
    state: HubChatStateEnum;
  }): Observable<HubChatModel> {
    return this.http
      .post<{ hubChat: HubChatEntity }>(
        `${environment.apiUrl}/hub/set-hub-chat-state`,
        {
          params,
        }
      )
      .pipe(
        map((res) => {
          return this.hubChatMapper.mapFrom(res.hubChat);
        })
      );
  }
}
