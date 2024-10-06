import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ChatModel } from '../domain/models/chat.model';
import { ChatRepository } from '../domain/repositories/chat.repository';

export class GetChatUseCase implements UseCaseObservable<string, ChatModel> {
  constructor(private chatRepository: ChatRepository) {}

  execute(targetProfileId: string): Observable<ChatModel> {
    return this.chatRepository.getChat(targetProfileId);
  }
}
