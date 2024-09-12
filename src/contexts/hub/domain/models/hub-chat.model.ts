import { ProfileModel } from '../../../profile/domain/models/profile.model';

export interface HubChatModel {
  id: string;
  hub_number: number;
  auth_profile: ProfileModel;
  target_profile: ProfileModel;
  // last_message_date: string;
  // count_new_messages: string;
  chat: any; //: ChatModel
}
