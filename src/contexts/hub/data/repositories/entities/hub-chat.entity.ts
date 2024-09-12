import { ProfileEntity } from '../../../../profile/data/repositories/entities/profile-entity';

export interface HubChatEntity {
  id: string;
  hub_number: number;
  auth_profile: ProfileEntity;
  target_profile: ProfileEntity;
  chat: any; //: ChatModel
}
