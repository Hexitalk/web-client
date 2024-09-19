import { Observable, switchMap, tap } from 'rxjs';
import { UseCase, UseCaseObservable } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserModel } from '../../user/domain/models/user.model';
import { ProfileModel } from '../../profile/domain/models/profile.model';
import { UserRepository } from '../../user/domain/repositories/user.repository';
import { ProfileRepository } from '../../profile/domain/repositories/profile.repository';

interface AuthLoginUseCaseResultType {
  user: UserModel;
  profile: ProfileModel;
  token: string;
}

export class AuthLoginUseCase
  implements
    UseCaseObservable<
      { email: string; password: string },
      AuthLoginUseCaseResultType
    >
{
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository
  ) {}

  /**
   * Authentication to get the auth token for the user by username and password credentials
   *
   * @param email - The email of user
   * @param password - The password of user
   * @returns An Observable with Auth Model info
   */
  execute(params: {
    email: string;
    password: string;
  }): Observable<AuthLoginUseCaseResultType> {
    return this.authRepository.login(params).pipe(
      tap((loginResult) => {
        loginResult.user && this.userRepository.setAuthUser(loginResult.user);
        loginResult.profile &&
          this.profileRepository.setAuthProfile(loginResult.profile);
      }),
      switchMap((loginResult) => {
        return new Observable<AuthLoginUseCaseResultType>((observer) => {
          observer.next(loginResult);
          observer.complete();
        });
      })
    );

    //return this.authRepository.login(params);
  }
}
