import { Observable } from 'rxjs';
import { UserModel } from '../../../user/domain/models/user.model';
import { ProfileModel } from '../../../profile/domain/models/profile.model';

interface AuthLoginUseCaseResultType {
  user: UserModel;
  profile: ProfileModel;
  token: string;
}

export abstract class AuthRepository {
  abstract login(params: {
    email: string;
    password: string;
  }): Observable<AuthLoginUseCaseResultType>;
  abstract register(
    params: Partial<UserModel & ProfileModel>
  ): Observable<AuthLoginUseCaseResultType>;
  abstract getAuthToken(): string;
  abstract listenAuthToken(): Observable<string>;
  abstract setAuthToken(token: string): void;
}
