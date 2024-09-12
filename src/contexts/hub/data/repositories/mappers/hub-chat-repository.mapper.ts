import { Mapper } from '../../../../shared/base/mapper';
import { HubChatModel } from '../../../domain/models/hub-chat.model';
import { HubChatEntity } from '../entities/hub-chat.entity';

export class HubChatImplementationRepositoryMapper extends Mapper<
  HubChatEntity,
  HubChatModel
> {
  mapFrom(param: HubChatEntity): HubChatModel {
    return {
      id: param.id,
      hub_number: param.hub_number,
      auth_profile: param.auth_profile,
      target_profile: param.target_profile,
      chat: param.chat,
    };
  }
  mapTo(param: HubChatModel): HubChatEntity {
    return {
      id: param.id,
      hub_number: param.hub_number,
      auth_profile: param.auth_profile,
      target_profile: param.target_profile,
      chat: param.chat,
    };
  }
}
