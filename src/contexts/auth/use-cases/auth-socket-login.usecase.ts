import { firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthSocketService } from '../domain/socket/auth-socket.service';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class AuthSocketLoginUseCase implements UseCase<string, void> {
  constructor(
    private authRepository: AuthRepository,
    private authSocketService: AuthSocketService
  ) {}

  /**
   * Authentication on socket system
   *
   * @param token - jwtToken of authenticated user
   * @returns void
   */
  execute(): void {
    const token = this.authRepository.getAuthToken();
    if (token) {
      this.authSocketService.login(token);
    }
  }
}
