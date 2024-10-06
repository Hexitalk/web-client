import { ProfileModel } from '../../../profile/domain/models/profile.model';

export interface ChatProfileModel {
  id: string;
  chat_id: string;
  profile_id: string;
  profile?: ProfileModel;
  create_date: string;
  update_date: string;
}
