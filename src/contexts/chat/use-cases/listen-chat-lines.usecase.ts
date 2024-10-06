import { distinctUntilChanged, Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ChatLineModel } from '../domain/models/chat-line.model';
import { ChatSocketService } from '../domain/socket/chat-socket.service';

export class ListenChatLinesUseCase
  implements UseCaseObservable<void, ChatLineModel>
{
  constructor(private chatSocketService: ChatSocketService) {}

  execute(): Observable<ChatLineModel> {
    return this.chatSocketService.listenChatLines();
  }
}
