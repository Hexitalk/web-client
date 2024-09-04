import { Observable } from 'rxjs';
import { FriendModel } from '../models/friend.model';

export abstract class FriendRepository {
  abstract login(params: {
    friendname: string;
    password: string;
  }): Observable<FriendModel>;
  abstract register(params: {
    phoneNum: string;
    password: string;
  }): Observable<FriendModel>;
  abstract getFriendProfile(): Observable<FriendModel>;
}
