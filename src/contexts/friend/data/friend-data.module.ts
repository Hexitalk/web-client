import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FriendImplementationRepository } from './repositories/friend-implementation.repository';
import { FriendRepository } from '../domain/repositories/friend.repository';
import { FriendRegisterUseCase } from '../use-cases/friend-register.usecase';
import { GetFriendProfileUseCase } from '../use-cases/get-friend-profile.usecase';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';

const friendRegisterUseCaseFactory = (friendRepo: FriendRepository) =>
  new FriendRegisterUseCase(friendRepo);
export const friendRegisterUseCaseProvider = {
  provide: FriendRegisterUseCase,
  useFactory: friendRegisterUseCaseFactory,
  deps: [FriendRepository],
};

const getFriendProfileUseCaseFactory = (friendRepo: FriendRepository) =>
  new GetFriendProfileUseCase(friendRepo);
export const getFriendProfileUseCaseProvider = {
  provide: GetFriendProfileUseCase,
  useFactory: getFriendProfileUseCaseFactory,
  deps: [FriendRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    friendRegisterUseCaseProvider,
    getFriendProfileUseCaseProvider,
    { provide: FriendRepository, useClass: FriendImplementationRepository },
  ],
  imports: [],
})
export class FriendDataModule {}
