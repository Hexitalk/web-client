import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

export abstract class ProfileSocketService {
  abstract listenProfileInfo(): Observable<ProfileModel>;
}
