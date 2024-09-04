import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { FriendModel } from '../domain/models/friend.model';
import { FriendRepository } from '../domain/repositories/friend.repository';

export class FriendRegisterUseCase
  implements UseCase<{ phoneNum: string; password: string }, FriendModel>
{
  constructor(private friendRepository: FriendRepository) {}

  execute(params: {
    phoneNum: string;
    password: string;
  }): Observable<FriendModel> {
    return this.friendRepository.register(params);
  }
}
