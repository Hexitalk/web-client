import { GenderEnum } from '../../../shared/enums';
import { HubChatModel } from './hub-chat.model';

export interface HubModel {
  hub_chats: HubChatModel[];
}
