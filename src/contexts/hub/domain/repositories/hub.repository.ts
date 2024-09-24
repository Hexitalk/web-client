import { Observable } from 'rxjs';
import { HubModel } from '../models/hub.model';
import { HubChatStateEnum } from '../enums';
import { HubChatModel } from '../models/hub-chat.model';

export abstract class HubRepository {
  abstract getHub(): Observable<HubModel>;
  abstract setHubChatState(params: {
    slot: number;
    state: HubChatStateEnum;
  }): Observable<HubChatModel>;
}
