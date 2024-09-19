import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export abstract class UserRepository {
  abstract getAuthUser(): Observable<UserModel | undefined>;
  abstract setAuthUser(profile: UserModel): void;
  abstract clearAuthUser(): void;

  // abstract getUserProfile(): Observable<UserModel>;
}
