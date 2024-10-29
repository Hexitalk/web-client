import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProfileImplementationRepository } from './profile-implementation.repository';
import { ProfileModel } from '../../domain/models/profile.model';

import { GenderEnum } from '../../../shared/enums';
import { provideHttpClient } from '@angular/common/http';

describe('ProfileImplementationRepository', () => {
  let repository: ProfileImplementationRepository;
  let httpMock: HttpTestingController;
  let mockProfile: ProfileModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProfileImplementationRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  beforeEach(() => {
    mockProfile = {
      id: '1',
      user_id: '12345',
      nick: 'JohnDoe',
      image: 'profile.jpg',
      date_birth: '1989-01-01',
      gender: GenderEnum.MALE,
      province_id: '001',
      country_id: 'US',
      online_status: true,
    };
  });

  beforeEach(() => {
    repository = TestBed.inject(ProfileImplementationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return the current profile with getAuthProfile', (done) => {
    repository.setAuthProfile(mockProfile);

    repository.getAuthProfile().subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
      done();
    });
  });

  it('should set the profile with setAuthProfile', () => {
    repository.setAuthProfile(mockProfile);

    expect(repository['profile']).toEqual(mockProfile);
  });

  it('should clear the profile with clearAuthProfile', () => {
    repository.setAuthProfile(mockProfile);
    repository.clearAuthProfile();

    expect(repository['profile']).toBeUndefined();
  });
});
