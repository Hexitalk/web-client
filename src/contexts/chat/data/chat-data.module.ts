import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';
import { ChatRepository } from '../domain/repositories/chat.repository';
import { GetChatUseCase } from '../use-cases/get-chat.usecase';
import { ListenChatLinesUseCase } from '../use-cases/listen-chat-lines.usecase';
import { ChatSocketService } from '../domain/socket/chat-socket.service';
import { loadChatLinesUseCase } from '../use-cases/load-chat-lines.usecase';
import { ChatImplementationRepository } from './repositories/chat-implementation.repository';
import { ChatSocketIoService } from './socket/chat-socket-io.service';
import { SendChatLineUseCase } from '../use-cases/send-chat-line.usecase';

const getChatUseCaseFactory = (chatRepo: ChatRepository) =>
  new GetChatUseCase(chatRepo);
export const getChatUseCaseProvider = {
  provide: GetChatUseCase,
  useFactory: getChatUseCaseFactory,
  deps: [ChatRepository],
};

const listenChatLinesUseCaseFactory = (chatSocket: ChatSocketService) =>
  new ListenChatLinesUseCase(chatSocket);
export const listenChatLinesUseCaseProvider = {
  provide: ListenChatLinesUseCase,
  useFactory: listenChatLinesUseCaseFactory,
  deps: [ChatSocketService],
};

const loadChatLinesUseCaseFactory = (chatRepo: ChatRepository) =>
  new loadChatLinesUseCase(chatRepo);
export const loadChatLinesUseCaseProvider = {
  provide: loadChatLinesUseCase,
  useFactory: loadChatLinesUseCaseFactory,
  deps: [ChatSocketService],
};

const sendChatLineUseCaseFactory = (chatRepo: ChatRepository) =>
  new SendChatLineUseCase(chatRepo);
export const sendChatLineUseCaseProvider = {
  provide: SendChatLineUseCase,
  useFactory: sendChatLineUseCaseFactory,
  deps: [ChatRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    getChatUseCaseProvider,
    listenChatLinesUseCaseProvider,
    loadChatLinesUseCaseProvider,
    sendChatLineUseCaseProvider,
    { provide: ChatRepository, useClass: ChatImplementationRepository },
    { provide: ChatSocketService, useClass: ChatSocketIoService },
  ],
  imports: [],
})
export class ChatDataModule {}
