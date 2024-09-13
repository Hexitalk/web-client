import { ProfileModel } from '../../../profile/domain/models/profile.model';

export interface HubChatModel {
  id: string;
  user_id: string;
  slot: number; // 1 - 6
  profile_id: string;
  last_message_date: string;
  unread_messages: number;
  auth_profile: ProfileModel | undefined;
  target_profile: ProfileModel | undefined;
  chat: any; //: ChatModel
}
