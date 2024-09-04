import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';

export class GetAuthUserUseCase
  implements UseCase<void, UserModel | undefined>
{
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel | undefined> {
    console.log('sí');
    return this.userRepository.getAuthUser();
  }
}
