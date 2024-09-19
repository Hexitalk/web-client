import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class ListenAuthTokenUseCase implements UseCaseObservable<void, string> {
  constructor(private authRepository: AuthRepository) {}

  /**
   *
   * @returns Observable<string>
   */
  execute(): Observable<string> {
    return this.authRepository.listenAuthToken();
  }
}
