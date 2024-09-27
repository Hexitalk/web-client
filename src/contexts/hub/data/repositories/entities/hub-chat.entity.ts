import { ProfileEntity } from '../../../../profile/data/repositories/entities/profile-entity';
import { HubChatStateEnum } from '../../../domain/enums/hub-chat-state.enum';

export interface HubChatEntity {
  id: string;
  slot: number;
  origin_profile_id: string;
  target_profile_id: string | null;
  origin_profile?: ProfileEntity;
  target_profile?: ProfileEntity;
  last_message_date: string;
  unread_messages: number;
  createdAt: string;
  updatedAt: string;
  state: HubChatStateEnum;
  chat?: any; //: ChatEntity
}
