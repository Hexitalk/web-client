import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from './entities/user-entity';
import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';
import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from '../../domain/models/user.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  private user: UserModel | undefined;

  constructor(private http: HttpClient) {
    super();
  }

  getAuthUser(): Observable<UserModel | undefined> {
    return of(this.user);
  }

  setAuthUser(profile: UserModel): void {
    this.user = profile;
  }

  clearAuthUser(): void {
    this.user = undefined;
  }
}
