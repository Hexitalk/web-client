import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';
import { HubRepository } from '../domain/repositories/hub.repository';
import { HubImplementationRepository } from './repositories/hub-implementation.repository';
import { HubSocketService } from '../domain/socket/hub-socket.service';
import { ListenHubUpdateUseCase } from '../use-cases/listen-hub-update.usecase';
import { HubSocketIoService } from './socket/hub-socket-io.service';
import { GetHubUseCase } from '../use-cases/get-hub.usecase';
import { SetHubChatStateUseCase } from '../use-cases/set-hub-chat-state.usecase';
import { ChatDataModule } from '../../chat/data/chat-data.module';

const getHubUseCaseFactory = (hubRepo: HubRepository) =>
  new GetHubUseCase(hubRepo);
export const getHubUseCaseProvider = {
  provide: GetHubUseCase,
  useFactory: getHubUseCaseFactory,
  deps: [HubRepository],
};

const listenHubUpdateUseCaseFactory = (hubSocket: HubSocketService) =>
  new ListenHubUpdateUseCase(hubSocket);
export const listenHubUpdateUseCaseProvider = {
  provide: ListenHubUpdateUseCase,
  useFactory: listenHubUpdateUseCaseFactory,
  deps: [HubSocketService],
};

const setHubChatStateUseCaseFactory = (hubRepo: HubRepository) =>
  new SetHubChatStateUseCase(hubRepo);
export const setHubChatStateUseCaseProvider = {
  provide: SetHubChatStateUseCase,
  useFactory: setHubChatStateUseCaseFactory,
  deps: [HubRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    getHubUseCaseProvider,
    listenHubUpdateUseCaseProvider,
    setHubChatStateUseCaseProvider,
    { provide: HubRepository, useClass: HubImplementationRepository },
    { provide: HubSocketService, useClass: HubSocketIoService },
  ],
  imports: [],
})
export class HubDataModule {}
