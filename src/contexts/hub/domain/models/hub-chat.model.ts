import { ProfileModel } from '../../../profile/domain/models/profile.model';
import { HubChatStateEnum } from '../enums';

export interface HubChatModel {
  id: string;
  slot: number; // 1 - 6
  origin_profile_id: string;
  target_profile_id: string | null;
  origin_profile?: ProfileModel;
  target_profile?: ProfileModel;
  last_message_date: string;
  unread_messages: number;
  createdAt: string;
  updatedAt: string;
  state: HubChatStateEnum;
  chat?: any; //: ChatModel
}
