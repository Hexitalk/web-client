import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

export abstract class ProfileRepository {
  abstract getAuthProfile(): Observable<ProfileModel | undefined>;
  abstract setAuthProfile(profile: ProfileModel): Observable<void>;
  // abstract getProfileProfile(): Observable<ProfileModel>;
}
