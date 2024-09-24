import { ProfileModel } from '../../../profile/domain/models/profile.model';
import { HubChatStateEnum } from '../enums';

export interface HubChatModel {
  id: string;
  user_id: string;
  slot: number; // 1 - 6
  profile_id: string | null;
  last_message_date: string;
  unread_messages: number;
  createdAt: string;
  updatedAt: string;
  auth_profile?: ProfileModel;
  target_profile?: ProfileModel;
  chat?: any; //: ChatModel
  state: HubChatStateEnum;
}
