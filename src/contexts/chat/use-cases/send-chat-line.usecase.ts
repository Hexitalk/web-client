import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ChatLineModel } from '../domain/models/chat-line.model';
import { ChatRepository } from '../domain/repositories/chat.repository';

export class SendChatLineUseCase
  implements
    UseCaseObservable<{ chatId: string; message: string }, ChatLineModel>
{
  constructor(private chatRepository: ChatRepository) {}

  execute(params: {
    chatId: string;
    message: string;
  }): Observable<ChatLineModel> {
    return this.chatRepository.sendChatLine(params);
  }
}
