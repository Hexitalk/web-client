import { GenderEnum } from '../../../shared/enums';
import { HubChatModel } from './hub-chat.model';

export interface HubModel {
  user_id?: string;
  hub_chats: HubChatModel[];
}
