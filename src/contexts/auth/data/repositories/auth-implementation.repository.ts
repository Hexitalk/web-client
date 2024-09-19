import {
  BehaviorSubject,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { environment } from '../../../../environments/environment.prod';
import { UserModel } from '../../../user/domain/models/user.model';
import { ProfileModel } from '../../../profile/domain/models/profile.model';
import { UserImplementationRepositoryMapper } from '../../../user/data/repositories/mappers/user-repository.mapper';
import { ProfileImplementationRepositoryMapper } from '../../../profile/data/repositories/mappers/profile-repository.mapper';
import { UserEntity } from '../../../user/data/repositories/entities/user-entity';
import { ProfileEntity } from '../../../profile/data/repositories/entities/profile-entity';

interface AuthLoginUseCaseResultType {
  user: UserModel;
  profile: ProfileModel;
  token: string;
}

interface AuthLoginApiResultType {
  user: UserEntity;
  profile: ProfileEntity;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  userMapper = new UserImplementationRepositoryMapper();
  profileMapper = new ProfileImplementationRepositoryMapper();

  // private tokenSubject = new BehaviorSubject<string>(this.loadToken());
  private tokenSubject = new ReplaySubject<string>();

  constructor(private http: HttpClient) {
    super();
  }

  login(params: {
    email: string;
    password: string;
  }): Observable<AuthLoginUseCaseResultType> {
    return this.http
      .post<AuthLoginApiResultType>(`${environment.apiUrl}/auth/login`, {
        params,
      })
      .pipe(
        map((res) => {
          return {
            ...res,
            user: this.userMapper.mapFrom(res.user),
            profile: this.profileMapper.mapFrom(res.profile),
          };
        })
      );
  }

  register(
    params: Partial<UserModel & ProfileModel>
  ): Observable<AuthLoginUseCaseResultType> {
    return this.http
      .post<AuthLoginApiResultType>(`${environment.apiUrl}/auth/register`, {
        params,
      })
      .pipe(
        map((res) => {
          return {
            ...res,
            user: this.userMapper.mapFrom(res.user),
            profile: this.profileMapper.mapFrom(res.profile),
          };
        }),
        catchError((err) => {
          console.log('error!!!!¿¿¿¿');
          return throwError(() => err);
        })
      );
  }

  // private loadToken(): string {
  //   return localStorage.getItem('hexitalk_auth_token') || '';
  // }

  getAuthToken(): string {
    return localStorage.getItem('hexitalk_auth_token') || '';
  }

  listenAuthToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  setAuthToken(token: string): void {
    localStorage.setItem('hexitalk_auth_token', token);
    this.tokenSubject.next(token);
  }
}
