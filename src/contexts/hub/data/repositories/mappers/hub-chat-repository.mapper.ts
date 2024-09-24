import { ProfileImplementationRepositoryMapper } from '../../../../profile/data/repositories/mappers/profile-repository.mapper';
import { Mapper } from '../../../../shared/base/mapper';
import { HubChatStateEnum } from '../../../domain/enums';
import { HubChatModel } from '../../../domain/models/hub-chat.model';
import { HubChatEntity } from '../entities/hub-chat.entity';

export class HubChatImplementationRepositoryMapper extends Mapper<
  HubChatEntity,
  HubChatModel
> {
  private profileMapper = new ProfileImplementationRepositoryMapper();

  mapFrom(param: HubChatEntity): HubChatModel {
    return {
      id: param.id,
      user_id: param.user_id,
      slot: param.slot,
      profile_id: param.profile_id,
      last_message_date: param.last_message_date,
      unread_messages: param.unread_messages,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      auth_profile: param.auth_profile
        ? this.profileMapper.mapFrom(param.auth_profile)
        : undefined,
      target_profile: param.profile
        ? this.profileMapper.mapFrom(param.profile)
        : undefined,
      chat: undefined,
      state: param.state ?? HubChatStateEnum.CLOSE,
    };
  }
  mapTo(param: HubChatModel): HubChatEntity {
    return {
      id: param.id,
      user_id: param.user_id,
      profile_id: param.profile_id,
      slot: param.slot,
      last_message_date: param.last_message_date,
      unread_messages: param.unread_messages,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      profile: param.target_profile
        ? this.profileMapper.mapTo(param.target_profile)
        : undefined,
      auth_profile: param.auth_profile
        ? this.profileMapper.mapTo(param.auth_profile)
        : undefined,
      state: param.state ?? HubChatStateEnum.CLOSE,
    };
  }
}
