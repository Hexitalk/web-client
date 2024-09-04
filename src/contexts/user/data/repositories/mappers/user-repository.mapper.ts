import { Mapper } from '../../../../shared/base/mapper';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user-entity';

export class UserImplementationRepositoryMapper extends Mapper<
  UserEntity,
  UserModel
> {
  mapFrom(param: UserEntity): UserModel {
    return {
      id: param.id,
      email: param.email,
      password: param.password,
      profile_id: param.profile_id,
    };
  }
  mapTo(param: UserModel): UserEntity {
    return {
      id: param.id,
      email: param.email,
      password: param.password,
      profile_id: param.profile_id,
    };
  }
}
