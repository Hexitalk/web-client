import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MainSocketIoService } from './socket/main-socket-io.service';
import { MainSocketService } from '../domain/socket/main-socket.service';
import { DisconnectSocketUseCase } from '../use-cases/disconnect-socket.usecase';
import { ReconnectSocketUseCase } from '../use-cases/reconnect-socket.usecase';
import { ListenConnectSocketUseCase } from '../use-cases/listen-connect-socket.usecase';
import { ListenErrorSocketUseCase } from '../use-cases/listen-error-socket.usecase';
import { ListenReconnectSocketUseCase } from '../use-cases/listen-reconnect-socket.usecase';

const disconectSocketUseCaseFactory = (mainSocketService: MainSocketService) =>
  new DisconnectSocketUseCase(mainSocketService);
export const disconectSocketUseProvider = {
  provide: DisconnectSocketUseCase,
  useFactory: disconectSocketUseCaseFactory,
  deps: [MainSocketService],
};

const reconnectSocketUseCaseFactory = (mainSocketService: MainSocketService) =>
  new ReconnectSocketUseCase(mainSocketService);
export const reconnectSocketUseCaseProvider = {
  provide: ReconnectSocketUseCase,
  useFactory: reconnectSocketUseCaseFactory,
  deps: [MainSocketService],
};

const listenConnectSocketUseCaseFactory = (
  mainSocketService: MainSocketService
) => new ListenConnectSocketUseCase(mainSocketService);
export const listenConnectSocketUseCaseProvider = {
  provide: ListenConnectSocketUseCase,
  useFactory: listenConnectSocketUseCaseFactory,
  deps: [MainSocketService],
};

const listenErrorSocketUseCaseFactory = (
  mainSocketService: MainSocketService
) => new ListenErrorSocketUseCase(mainSocketService);
export const listenErrorSocketUseCaseProvider = {
  provide: ListenErrorSocketUseCase,
  useFactory: listenErrorSocketUseCaseFactory,
  deps: [MainSocketService],
};

const listenReconnectSocketUseCaseFactory = (
  mainSocketService: MainSocketService
) => new ListenReconnectSocketUseCase(mainSocketService);
export const listenReconnectSocketUseCaseProvider = {
  provide: ListenReconnectSocketUseCase,
  useFactory: listenReconnectSocketUseCaseFactory,
  deps: [MainSocketService],
};

@NgModule({
  providers: [
    provideHttpClient(/* withInterceptors([authInterceptor])*/),
    disconectSocketUseProvider,
    reconnectSocketUseCaseProvider,
    listenConnectSocketUseCaseProvider,
    listenErrorSocketUseCaseProvider,
    listenReconnectSocketUseCaseProvider,
    { provide: MainSocketService, useClass: MainSocketIoService },
  ],
  imports: [],
})
export class SocketDataModule {
  /* */
}
