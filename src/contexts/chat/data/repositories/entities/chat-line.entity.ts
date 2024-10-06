import { ProfileEntity } from '../../../../profile/data/repositories/entities/profile-entity';

export interface ChatLineEntity {
  id: string;
  chat_id: string;
  profile_id: string;
  profile?: ProfileEntity;
  text: string;
  create_date: string;
  update_date: string;
}
