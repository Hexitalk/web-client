import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProfileImplementationRepositoryMapper } from './mappers/profile-repository.mapper';
import { Injectable } from '@angular/core';
import { ProfileRepository } from '../../domain/repositories/profile.repository';
import { ProfileModel } from '../../domain/models/profile.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProfileImplementationRepository extends ProfileRepository {
  profileMapper = new ProfileImplementationRepositoryMapper();

  private profile: ProfileModel | undefined;

  constructor(private http: HttpClient) {
    super();
  }

  getAuthProfile(): Observable<ProfileModel | undefined> {
    return new Observable<ProfileModel | undefined>((observer) => {
      observer.next(this.profile);
      observer.complete();
    });
    //return of(this.profile);
  }

  setAuthProfile(profile: ProfileModel): void {
    this.profile = profile;
  }

  clearAuthProfile(): void {
    this.profile = undefined;
  }

  /* getProfileProfile(): Observable<ProfileModel> {
    return this.http
      .get<ProfileEntity>(`${environment.apiUrl}/auth/get-profile`)
      .pipe(map(this.profileMapper.mapFrom));
  }*/
}
