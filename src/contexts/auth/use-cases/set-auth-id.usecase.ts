import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class SetAuthIdUseCase implements UseCase<string, void> {
  constructor(private authRepository: AuthRepository) {}

  execute(token: string): void {
    this.authRepository.setAuthId(token);
  }
}
