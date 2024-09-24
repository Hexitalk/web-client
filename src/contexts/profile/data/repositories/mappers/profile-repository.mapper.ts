import { Mapper } from '../../../../shared/base/mapper';
import { ProfileModel } from '../../../domain/models/profile.model';
import { ProfileEntity } from '../entities/profile-entity';

export class ProfileImplementationRepositoryMapper extends Mapper<
  ProfileEntity,
  ProfileModel
> {
  mapFrom(param: ProfileEntity): ProfileModel {
    return {
      id: param.id,
      user_id: param.user_id,
      nick: param.nick,
      image: param.image,
      date_birth: param.date_birth,
      gender: param.gender,
      province_id: param.province_id,
      country_id: param.country_id,
      online_status: param.online_status ?? false,
    };
  }
  mapTo(param: ProfileModel): ProfileEntity {
    return {
      id: param.id,
      user_id: param.user_id,
      nick: param.nick,
      image: param.image,
      date_birth: param.date_birth,
      gender: param.gender,
      province_id: param.province_id,
      country_id: param.country_id,
      online_status: param.online_status ?? false,
    };
  }
}
