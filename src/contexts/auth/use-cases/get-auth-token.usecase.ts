import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class GetAuthTokenUseCase implements UseCase<void, string> {
  constructor(private authRepository: AuthRepository) {}

  /**
   *
   * @returns Observable<string>
   */
  execute(): Observable<string> {
    return this.authRepository.getAuthToken();
  }
}
