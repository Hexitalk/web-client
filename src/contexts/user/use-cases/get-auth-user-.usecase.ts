import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';

export class GetAuthUserUseCase
  implements UseCaseObservable<void, UserModel | undefined>
{
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel | undefined> {
    console.log('sí');
    return this.userRepository.getAuthUser();
  }
}
