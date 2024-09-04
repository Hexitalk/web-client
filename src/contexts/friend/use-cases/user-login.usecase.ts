import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { FriendModel } from '../domain/models/friend.model';
import { FriendRepository } from '../domain/repositories/friend.repository';

export class FriendLoginUseCase
  implements UseCase<{ friendname: string; password: string }, FriendModel>
{
  constructor(private friendRepository: FriendRepository) {}

  execute(params: {
    friendname: string;
    password: string;
  }): Observable<FriendModel> {
    return this.friendRepository.login(params);
  }
}
