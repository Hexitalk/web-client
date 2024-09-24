import { ProfileEntity } from '../../../../profile/data/repositories/entities/profile-entity';
import { HubChatStateEnum } from '../../../domain/enums/hub-chat-state.enum';

export interface HubChatEntity {
  id: string;
  user_id: string;
  profile_id: string | null;
  slot: number;
  last_message_date: string;
  unread_messages: number;
  createdAt: string;
  updatedAt: string;
  profile?: ProfileEntity;
  auth_profile?: ProfileEntity;
  state: HubChatStateEnum;
}
