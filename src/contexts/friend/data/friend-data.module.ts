import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FriendImplementationRepository } from './repositories/friend-implementation.repository';
import { FriendRepository } from '../domain/repositories/friend.repository';
import { FriendLoginUseCase } from '../use-cases/friend-login.usecase';
import { FriendRegisterUseCase } from '../use-cases/friend-register.usecase';
import { GetFriendProfileUseCase } from '../use-cases/get-friend-profile.usecase';

const friendLoginUseCaseFactory = (friendRepo: FriendRepository) =>
  new FriendLoginUseCase(friendRepo);
export const friendLoginUseCaseProvider = {
  provide: FriendLoginUseCase,
  useFactory: friendLoginUseCaseFactory,
  deps: [FriendRepository],
};

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
    provideHttpClient(withInterceptorsFromDi()),
    friendLoginUseCaseProvider,
    friendRegisterUseCaseProvider,
    getFriendProfileUseCaseProvider,
    { provide: FriendRepository, useClass: FriendImplementationRepository },
  ],
  imports: [CommonModule],
})
export class FriendDataModule {}
