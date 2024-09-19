import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ProfileImplementationRepository } from './repositories/profile-implementation.repository';
import { ProfileRepository } from '../domain/repositories/profile.repository';
import { GetAuthProfileUseCase } from '../use-cases/get-auth-profile.usecase';
import { SetAuthProfileUseCase } from '../use-cases/set-auth-profile.usecase';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';
import { ClearAuthProfileUseCase } from '../use-cases/clear-auth-profile.usecase';

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

const clearAuthProfileUseCaseFactory = (profileRepo: ProfileRepository) =>
  new ClearAuthProfileUseCase(profileRepo);
export const clearAuthProfileUseCaseProvider = {
  provide: ClearAuthProfileUseCase,
  useFactory: clearAuthProfileUseCaseFactory,
  deps: [ProfileRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    getAuthProfileUseCaseProvider,
    setAuthProfileUseCaseProvider,
    clearAuthProfileUseCaseProvider,
    { provide: ProfileRepository, useClass: ProfileImplementationRepository },
  ],
  imports: [],
})
export class ProfileDataModule {}
