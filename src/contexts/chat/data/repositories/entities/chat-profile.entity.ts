import { ProfileEntity } from '../../../../profile/data/repositories/entities/profile-entity';

export interface ChatProfileEntity {
  id: string;
  chat_id: string;
  profile_id: string;
  profile?: ProfileEntity;
  create_date: string;
  update_date: string;
}
