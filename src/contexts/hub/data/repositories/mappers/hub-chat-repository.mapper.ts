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
      origin_profile_id: param.origin_profile_id,
      target_profile_id: param.target_profile_id,
      slot: param.slot,
      last_message_date: param.last_message_date,
      unread_messages: param.unread_messages,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      origin_profile: param.origin_profile
        ? this.profileMapper.mapFrom(param.origin_profile)
        : undefined,
      target_profile: param.target_profile
        ? this.profileMapper.mapFrom(param.target_profile)
        : undefined,
      chat: undefined,
      state: param.state ?? HubChatStateEnum.CLOSE,
    };
  }
  mapTo(param: HubChatModel): HubChatEntity {
    return {
      id: param.id,
      origin_profile_id: param.origin_profile_id,
      target_profile_id: param.target_profile_id,
      slot: param.slot,
      last_message_date: param.last_message_date,
      unread_messages: param.unread_messages,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      origin_profile: param.origin_profile
        ? this.profileMapper.mapTo(param.origin_profile)
        : undefined,
      target_profile: param.target_profile
        ? this.profileMapper.mapTo(param.target_profile)
        : undefined,
      state: param.state ?? HubChatStateEnum.CLOSE,
    };
  }
}
