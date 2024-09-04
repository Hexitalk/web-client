import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProfileImplementationRepository } from './repositories/profile-implementation.repository';
import { ProfileRepository } from '../domain/repositories/profile.repository';
import { GetAuthProfileUseCase } from '../use-cases/get-auth-profile.usecase';
import { SetAuthProfileUseCase } from '../use-cases/set-auth-profile.usecase';

const getAuthProfileUseCaseFactory = (profileRepo: ProfileRepository) =>
  new GetAuthProfileUseCase(profileRepo);
export const getAuthProfileUseCaseProvider = {
  provide: GetAuthProfileUseCase,
  useFactory: getAuthProfileUseCaseFactory,
  deps: [ProfileRepository],
};

const setAuthProfileUseCaseFactory = (profileRepo: ProfileRepository) =>
  new SetAuthProfileUseCase(profileRepo);
export const setAuthProfileUseCaseProvider = {
  provide: SetAuthProfileUseCase,
  useFactory: setAuthProfileUseCaseFactory,
  deps: [ProfileRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    getAuthProfileUseCaseProvider,
    setAuthProfileUseCaseProvider,
    { provide: ProfileRepository, useClass: ProfileImplementationRepository },
  ],
  imports: [CommonModule],
})
export class ProfileDataModule {}
