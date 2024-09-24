import { Mapper } from '../../../../shared/base/mapper';
import { HubModel } from '../../../domain/models/hub.model';
import { HubEntity } from '../entities/hub-entity';
import { HubChatImplementationRepositoryMapper } from './hub-chat-repository.mapper';

export class HubImplementationRepositoryMapper extends Mapper<
  HubEntity,
  HubModel
> {
  private hubChatMapper = new HubChatImplementationRepositoryMapper();

  mapFrom(param: HubEntity): HubModel {
    return {
      hub_chats: param.hub_chats.map((c) => this.hubChatMapper.mapFrom(c)),
    };
  }
  mapTo(param: HubModel): HubEntity {
    return {
      hub_chats: param.hub_chats.map((c) => this.hubChatMapper.mapTo(c)),
    };
  }
}
