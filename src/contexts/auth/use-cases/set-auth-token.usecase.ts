import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class SetAuthTokenUseCase implements UseCase<string, void> {
  constructor(private authRepository: AuthRepository) {}

  execute(token: string): Observable<void> {
    return this.authRepository.setAuthToken(token);
  }
}
