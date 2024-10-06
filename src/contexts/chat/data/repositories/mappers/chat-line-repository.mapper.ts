import { ProfileImplementationRepositoryMapper } from '../../../../profile/data/repositories/mappers/profile-repository.mapper';
import { Mapper } from '../../../../shared/base/mapper';
import { ChatLineModel } from '../../../domain/models/chat-line.model';
import { ChatLineEntity } from '../entities/chat-line.entity';

export class ChatLineImplementationRepositoryMapper extends Mapper<
  ChatLineEntity,
  ChatLineModel
> {
  private profileMapper = new ProfileImplementationRepositoryMapper();

  mapFrom(param: ChatLineEntity): ChatLineModel {
    return {
      id: param.id,
      chat_id: param.chat_id,
      profile_id: param.profile_id,
      text: param.text,
      create_date: param.create_date,
      update_date: param.update_date,
      profile: param.profile
        ? this.profileMapper.mapFrom(param.profile)
        : undefined,
    };
  }
  mapTo(param: ChatLineModel): ChatLineEntity {
    return {
      id: param.id,
      chat_id: param.chat_id,
      profile_id: param.profile_id,
      text: param.text,
      create_date: param.create_date,
      update_date: param.update_date,
      profile: param.profile
        ? this.profileMapper.mapTo(param.profile)
        : undefined,
    };
  }
}
