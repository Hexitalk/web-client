import { GenderEnum } from '../../../../shared/enums';

export interface ProfileEntity {
  id: string;
  user_id: string;
  nick: string;
  image: string;
  date_birth: string;
  gender: GenderEnum;
  province_id: string;
  country_id: string;
  online_status: boolean;
}
