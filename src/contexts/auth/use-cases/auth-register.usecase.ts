import { Observable, switchMap, tap } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserModel } from '../../user/domain/models/user.model';
import { ProfileModel } from '../../profile/domain/models/profile.model';
import { ProfileRepository } from '../../profile/domain/repositories/profile.repository';
import { UserRepository } from '../../user/domain/repositories/user.repository';

interface AuthLoginUseCaseResultType {
  user: UserModel;
  profile: ProfileModel;
  token: string;
}

export class AuthRegisterUseCase
  implements
    UseCaseObservable<
      Partial<UserModel & ProfileModel>,
      AuthLoginUseCaseResultType
    >
{
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository
  ) {}

  execute(
    params: Partial<UserModel & ProfileModel>
  ): Observable<AuthLoginUseCaseResultType> {
    return this.authRepository.register(params).pipe(
      tap((loginResult) => {
        const { user, profile } = loginResult;
        user && this.userRepository.setAuthUser(user);
        profile && this.profileRepository.setAuthProfile(profile);
      })
      /*switchMap((loginResult) => {
        return new Observable<AuthLoginUseCaseResultType>((observer) => {
          observer.next(loginResult);
          observer.complete();
        });
      })*/
    );
    // return this.authRepository.register(params);
  }
}
