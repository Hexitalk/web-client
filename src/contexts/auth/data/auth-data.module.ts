import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthImplementationRepository } from './repositories/auth-implementation.repository';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthLoginUseCase } from '../use-cases/auth-login.usecase';
import { AuthRegisterUseCase } from '../use-cases/auth-register.usecase';
import { GetAuthTokenUseCase } from '../use-cases/get-auth-token.usecase';
import { SetAuthTokenUseCase } from '../use-cases/set-auth-token.usecase';
import { UserRepository } from '../../user/domain/repositories/user.repository';
import { ProfileRepository } from '../../profile/domain/repositories/profile.repository';
import { UserDataModule } from '../../user/data/user-data.module';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';
import { AuthSocketIoService } from './socket/auth-socket-io.service';
import { AuthSocketService } from '../domain/socket/auth-socket.service';
import { AuthSocketLoginUseCase } from '../use-cases/auth-socket-login.usecase';
import { ListenAuthTokenUseCase } from '../use-cases/listen-auth-token.usecase';
import { AuthLogoutUseCase } from '../use-cases/auth-logout.usecase';
import { AuthSocketLogoutUseCase } from '../use-cases/auth-socket-logout.usecase';

const authLoginUseCaseFactory = (
  authRepo: AuthRepository,
  userRepo: UserRepository,
  profileRepo: ProfileRepository
) => new AuthLoginUseCase(authRepo, userRepo, profileRepo);
export const authLoginUseCaseProvider = {
  provide: AuthLoginUseCase,
  useFactory: authLoginUseCaseFactory,
  deps: [AuthRepository, UserRepository, ProfileRepository],
};

const authRegisterUseCaseFactory = (
  authRepo: AuthRepository,
  userRepo: UserRepository,
  profileRepo: ProfileRepository
) => new AuthRegisterUseCase(authRepo, userRepo, profileRepo);
export const authRegisterUseCaseProvider = {
  provide: AuthRegisterUseCase,
  useFactory: authRegisterUseCaseFactory,
  deps: [AuthRepository, UserRepository, ProfileRepository],
};

const getAuthTokenUseCaseFactory = (authRepo: AuthRepository) =>
  new GetAuthTokenUseCase(authRepo);
export const getAuthTokenUseCaseProvider = {
  provide: GetAuthTokenUseCase,
  useFactory: getAuthTokenUseCaseFactory,
  deps: [AuthRepository],
};

const listenAuthTokenUseCaseFactory = (authRepo: AuthRepository) =>
  new ListenAuthTokenUseCase(authRepo);
export const listenAuthTokenUseCaseProvider = {
  provide: ListenAuthTokenUseCase,
  useFactory: listenAuthTokenUseCaseFactory,
  deps: [AuthRepository],
};

const setAuthTokenUseCaseFactory = (authRepo: AuthRepository) =>
  new SetAuthTokenUseCase(authRepo);
export const setAuthTokenUseCaseProvider = {
  provide: SetAuthTokenUseCase,
  useFactory: setAuthTokenUseCaseFactory,
  deps: [AuthRepository],
};

const authLogoutUseCaseFactory = (
  authRepo: AuthRepository,
  userRepo: UserRepository,
  profileRepo: ProfileRepository
) => new AuthLogoutUseCase(authRepo, userRepo, profileRepo);
export const authLogoutUseCaseProvider = {
  provide: AuthLogoutUseCase,
  useFactory: authLogoutUseCaseFactory,
  deps: [AuthRepository, UserRepository, ProfileRepository],
};

const authSocketLoginUseCaseFactory = (
  authRepo: AuthRepository,
  authSocketService: AuthSocketService
) => new AuthSocketLoginUseCase(authRepo, authSocketService);
export const authSocketLoginUseCaseProvider = {
  provide: AuthSocketLoginUseCase,
  useFactory: authSocketLoginUseCaseFactory,
  deps: [AuthRepository, AuthSocketService],
};

const authSocketLogoutUseCaseFactory = (
  authRepo: AuthRepository,
  authSocketService: AuthSocketService
) => new AuthSocketLogoutUseCase(authRepo, authSocketService);
export const authSocketLogoutUseCaseProvider = {
  provide: AuthSocketLogoutUseCase,
  useFactory: authSocketLogoutUseCaseFactory,
  deps: [AuthRepository, AuthSocketService],
};

// Socket

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    authLoginUseCaseProvider,
    authRegisterUseCaseProvider,
    getAuthTokenUseCaseProvider,
    setAuthTokenUseCaseProvider,
    listenAuthTokenUseCaseProvider,
    authLogoutUseCaseProvider,
    authSocketLoginUseCaseProvider,
    authSocketLogoutUseCaseProvider,
    { provide: AuthRepository, useClass: AuthImplementationRepository },
    { provide: AuthSocketService, useClass: AuthSocketIoService },
  ],
  imports: [UserDataModule],
})
export class AuthDataModule {
  /* */
}
