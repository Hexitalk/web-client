import { ProfileModel } from '../../../profile/domain/models/profile.model';

export interface ChatLineModel {
  id: string;
  chat_id: string;
  profile_id: string;
  profile?: ProfileModel;
  text: string;
  create_date: string;
  update_date: string;
}
