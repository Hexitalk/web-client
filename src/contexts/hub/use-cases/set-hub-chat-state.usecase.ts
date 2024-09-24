import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { HubRepository } from '../domain/repositories/hub.repository';
import { HubChatModel } from '../domain/models/hub-chat.model';
import { HubChatStateEnum } from '../domain/enums';

export class SetHubChatStateUseCase
  implements
    UseCaseObservable<{ slot: number; state: HubChatStateEnum }, HubChatModel>
{
  constructor(private hubRepository: HubRepository) {}

  execute(params: {
    slot: number;
    state: HubChatStateEnum;
  }): Observable<HubChatModel> {
    const { slot, state } = params;
    return this.hubRepository.setHubChatState({ slot, state });
  }
}
