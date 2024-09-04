import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FriendEntity } from './entities/friend-entity';
import { FriendImplementationRepositoryMapper } from './mappers/friend-repository.mapper';
import { Injectable } from '@angular/core';
import { FriendRepository } from '../../domain/repositories/friend.repository';
import { FriendModel } from '../../domain/models/friend.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FriendImplementationRepository extends FriendRepository {
  friendMapper = new FriendImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  login(params: {
    friendname: string;
    password: string;
  }): Observable<FriendModel> {
    return this.http
      .post<FriendEntity>(`${environment.apiUrl}/auth/login`, { params })
      .pipe(map(this.friendMapper.mapFrom));
  }
  register(params: {
    phoneNum: string;
    password: string;
  }): Observable<FriendModel> {
    return this.http
      .post<FriendEntity>(`${environment.apiUrl}/auth/register`, { params })
      .pipe(map(this.friendMapper.mapFrom));
  }
  getFriendProfile(): Observable<FriendModel> {
    return this.http
      .get<FriendEntity>(`${environment.apiUrl}/auth/get-profile`)
      .pipe(map(this.friendMapper.mapFrom));
  }
}
