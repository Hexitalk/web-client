import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { AuthSocketService } from '../domain/socket/auth-socket.service';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class AuthSocketLoginUseCase implements UseCase<string, void> {
  constructor(
    private authSocketService: AuthSocketService,
    private authRepository: AuthRepository
  ) {}

  /**
   * Authentication on socket system
   *
   * @param token - jwtToken of authenticated user
   * @returns void
   */
  execute(token: string): Observable<void> {
    return this.authRepository.getAuthToken().pipe(
      tap((token: string) => {
        if (token) {
          this.authSocketService.login(token);
        }
      }),
      map(() => void 0)
    );
  }
}
