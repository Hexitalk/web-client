import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { ChatImplementationRepositoryMapper } from './mappers/chat-repository.mapper';
import { ChatLineImplementationRepositoryMapper } from './mappers/chat-line-repository.mapper';
import { ChatRepository } from '../../domain/repositories/chat.repository';
import { ChatModel } from '../../domain/models/chat.model';
import { ChatEntity } from './entities/hub-entity';
import { ChatLineModel } from '../../domain/models/chat-line.model';
import { ChatLineEntity } from './entities/chat-line.entity';

@Injectable({
  providedIn: 'root',
})
export class ChatImplementationRepository extends ChatRepository {
  chatMapper = new ChatImplementationRepositoryMapper();
  chatLineMapper = new ChatLineImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getChat(targetProfileId: string): Observable<ChatModel> {
    return this.http
      .post<{ chat: ChatEntity }>(`${environment.apiUrl}/chats/get-chat`, {
        params: {
          targetProfileId,
        },
      })
      .pipe(
        map((res) => {
          return this.chatMapper.mapFrom(res.chat);
        })
      );
  }
  loadPreviousChatLines(params: {
    targetProfileId: string;
    lastChatLineId: string;
  }): Observable<ChatLineModel[]> {
    return this.http
      .post<{ chatLines: ChatLineEntity[] }>(
        `${environment.apiUrl}/chats/load-chat-lines`,
        {
          params,
        }
      )
      .pipe(
        map((res) => {
          return res.chatLines.map((cl) => this.chatLineMapper.mapFrom(cl));
        })
      );
  }

  override sendChatLine(params: {
    message: string;
    chatId: string;
  }): Observable<ChatLineModel> {
    return this.http
      .post<{ chatLine: ChatLineEntity }>(
        `${environment.apiUrl}/chats/send-chat-line`,
        {
          params,
        }
      )
      .pipe(
        map((res) => {
          return this.chatLineMapper.mapFrom(res.chatLine);
        })
      );
  }
}
