import { Observable } from 'rxjs';
import { ChatLineModel } from '../models/chat-line.model';

export abstract class ChatSocketService {
  abstract listenChatLines(): Observable<ChatLineModel>;
}
