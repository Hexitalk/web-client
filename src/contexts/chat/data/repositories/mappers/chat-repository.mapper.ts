import { Mapper } from '../../../../shared/base/mapper';
import { ChatModel } from '../../../domain/models/chat.model';
import { ChatEntity } from '../entities/hub-entity';
import { ChatLineImplementationRepositoryMapper } from './chat-line-repository.mapper';
import { ChatProfileImplementationRepositoryMapper } from './chat-profile-repository.mapper';

export class ChatImplementationRepositoryMapper extends Mapper<
  ChatEntity,
  ChatModel
> {
  private chatLineMapper = new ChatLineImplementationRepositoryMapper();
  private chatProfileMapper = new ChatProfileImplementationRepositoryMapper();

  mapFrom(param: ChatEntity): ChatModel {
    return {
      id: param.id,
      last_message_date: param.last_message_date,
      create_date: param.create_date,
      update_date: param.update_date,
      chat_lines: param.chat_lines.length
        ? param.chat_lines.map((cl) => this.chatLineMapper.mapFrom(cl))
        : [],
      chats_profiles: param.chats_profiles.length
        ? param.chats_profiles.map((cl) => this.chatProfileMapper.mapFrom(cl))
        : [],
    };
  }
  mapTo(param: ChatModel): ChatEntity {
    return {
      id: param.id,
      last_message_date: param.last_message_date,
      create_date: param.create_date,
      update_date: param.update_date,
      chat_lines: param.chat_lines.length
        ? param.chat_lines.map((cl) => this.chatLineMapper.mapTo(cl))
        : [],
      chats_profiles: param.chats_profiles.length
        ? param.chats_profiles.map((cl) => this.chatProfileMapper.mapTo(cl))
        : [],
    };
  }
}
