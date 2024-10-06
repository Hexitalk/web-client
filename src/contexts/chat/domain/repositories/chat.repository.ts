import { Observable } from 'rxjs';
import { ChatModel } from '../models/chat.model';
import { ChatLineModel } from '../models/chat-line.model';

export abstract class ChatRepository {
  abstract getChat(targetProfileId: string): Observable<ChatModel>;
  abstract loadPreviousChatLines(params: {
    targetProfileId: string;
    lastChatLineId: string;
  }): Observable<ChatLineModel[]>;
  abstract sendChatLine(params: {
    message: string;
    chatId: string;
  }): Observable<ChatLineModel>;
}
