import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, tap } from 'rxjs';
import { ChatSocketService } from '../../domain/socket/chat-socket.service';
import { ChatImplementationRepositoryMapper } from '../repositories/mappers/chat-repository.mapper';
import { ChatLineModel } from '../../domain/models/chat-line.model';
import { ChatLineEntity } from '../repositories/entities/chat-line.entity';
import { ChatLineImplementationRepositoryMapper } from '../repositories/mappers/chat-line-repository.mapper';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketIoService extends ChatSocketService {
  chatMapper = new ChatImplementationRepositoryMapper();
  chatLineMapper = new ChatLineImplementationRepositoryMapper();

  constructor(private socket: Socket) {
    super();
  }

  listenChatLines(): Observable<ChatLineModel> {
    return this.socket.fromEvent<ChatLineEntity>('chats.new-chat-lines').pipe(
      map((res) => {
        return this.chatLineMapper.mapFrom(res);
      }),
      tap(console.log)
    );

    /*.pipe(
      map((res) => {
        return res.map((cl) => this.chatLineMapper.mapFrom(cl));
      })
    )*/
  }
}
