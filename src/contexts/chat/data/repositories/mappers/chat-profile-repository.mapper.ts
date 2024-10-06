import { ProfileImplementationRepositoryMapper } from '../../../../profile/data/repositories/mappers/profile-repository.mapper';
import { Mapper } from '../../../../shared/base/mapper';
import { ChatProfileModel } from '../../../domain/models/chat-profile.model';
import { ChatProfileEntity } from '../entities/chat-profile.entity';

export class ChatProfileImplementationRepositoryMapper extends Mapper<
  ChatProfileEntity,
  ChatProfileModel
> {
  private profileMapper = new ProfileImplementationRepositoryMapper();

  mapFrom(param: ChatProfileEntity): ChatProfileModel {
    return {
      id: param.id,
      chat_id: param.chat_id,
      profile_id: param.profile_id,
      create_date: param.create_date,
      update_date: param.update_date,
      profile: param.profile
        ? this.profileMapper.mapFrom(param.profile)
        : undefined,
    };
  }
  mapTo(param: ChatProfileModel): ChatProfileEntity {
    return {
      id: param.id,
      chat_id: param.chat_id,
      profile_id: param.profile_id,
      create_date: param.create_date,
      update_date: param.update_date,
      profile: param.profile
        ? this.profileMapper.mapTo(param.profile)
        : undefined,
    };
  }
}
