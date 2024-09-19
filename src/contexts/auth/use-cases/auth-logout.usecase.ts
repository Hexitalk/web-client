import { Observable, switchMap, tap } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserRepository } from '../../user/domain/repositories/user.repository';
import { ProfileRepository } from '../../profile/domain/repositories/profile.repository';

export class AuthLogoutUseCase implements UseCase<void, void> {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository
  ) {}

  /**
   * Authentication to get the auth token for the user by username and password credentials
   *
   * @param
   * @returns An Observable with Auth Model info
   */
  execute(): void {
    this.profileRepository.clearAuthProfile();
    this.userRepository.clearAuthUser();
    this.authRepository.setAuthToken('');
  }
}
