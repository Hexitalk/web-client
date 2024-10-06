import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ChatLineModel } from '../domain/models/chat-line.model';
import { ChatRepository } from '../domain/repositories/chat.repository';

export class loadChatLinesUseCase
  implements
    UseCaseObservable<
      { targetProfileId: string; lastChatLineId: string },
      ChatLineModel[]
    >
{
  constructor(private chatRepository: ChatRepository) {}

  execute(params: {
    targetProfileId: string;
    lastChatLineId: string;
  }): Observable<ChatLineModel[]> {
    const { targetProfileId, lastChatLineId } = params;
    return this.chatRepository.loadPreviousChatLines({
      targetProfileId,
      lastChatLineId,
    });
  }
}
