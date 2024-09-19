import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { FriendModel } from '../domain/models/friend.model';
import { FriendRepository } from '../domain/repositories/friend.repository';

export class GetFriendProfileUseCase
  implements UseCaseObservable<void, FriendModel>
{
  constructor(private friendRepository: FriendRepository) {}

  execute(): Observable<FriendModel> {
    return this.friendRepository.getFriendProfile();
  }
}
