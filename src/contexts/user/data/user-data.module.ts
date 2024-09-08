import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserImplementationRepository } from './repositories/user-implementation.repository';
import { UserRepository } from '../domain/repositories/user.repository';
import { GetAuthUserUseCase } from '../use-cases/get-auth-user-.usecase';
import { SetAuthUserUseCase } from '../use-cases/set-auth-user.usecase';
import { ProfileDataModule } from '../../profile/data/profile-data.module';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';

const getAuthUserUseCaseFactory = (userRepo: UserRepository) =>
  new GetAuthUserUseCase(userRepo);
export const getAuthUserUseCaseProvider = {
  provide: GetAuthUserUseCase,
  useFactory: getAuthUserUseCaseFactory,
  deps: [UserRepository],
};

const setAuthUserUseCaseFactory = (userRepo: UserRepository) =>
  new SetAuthUserUseCase(userRepo);
export const setAuthUserUseCaseProvider = {
  provide: SetAuthUserUseCase,
  useFactory: setAuthUserUseCaseFactory,
  deps: [UserRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    getAuthUserUseCaseProvider,
    setAuthUserUseCaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository },
  ],
  imports: [ProfileDataModule],
})
export class UserDataModule {}
