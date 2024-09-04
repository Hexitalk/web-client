import { Mapper } from '../../../../shared/base/mapper';
import { FriendModel } from '../../../domain/models/friend.model';
import { FriendEntity } from '../entities/friend-entity';

export class FriendImplementationRepositoryMapper extends Mapper<
  FriendEntity,
  FriendModel
> {
  mapFrom(param: FriendEntity): FriendModel {
    return {
      id: param.id,
      fullName: param.name,
      friendname: param.friendName,
      phoneNum: param.phoneNumber,
      profilePicture: param.friendPicture,
      activationStatus: param.activationStatus,
    };
  }
  mapTo(param: FriendModel): FriendEntity {
    return {
      id: param.id,
      name: param.fullName,
      friendName: param.friendname,
      phoneNumber: param.phoneNum,
      friendPicture: param.profilePicture,
      activationStatus: param.activationStatus,
    };
  }
}
