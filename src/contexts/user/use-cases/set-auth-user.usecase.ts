import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';

export class SetAuthUserUseCase implements UseCase<UserModel, void> {
  constructor(private userRepository: UserRepository) {}

  execute(params: UserModel): void {
    this.userRepository.setAuthUser(params);
  }
}
