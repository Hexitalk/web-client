import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthImplementationRepository } from './auth-implementation.repository';
import { environment } from '../../../../environments/environment.prod';
import { provideHttpClient } from '@angular/common/http';
import { GenderEnum } from '../../../shared/enums';
import { ProfileModel } from '../../../profile/domain/models/profile.model';
import { UserModel } from '../../../user/domain/models/user.model';

fdescribe('AuthImplementationRepository', () => {
  let repository: AuthImplementationRepository;
  let httpMock: HttpTestingController;
  let mockResponse: { user: UserModel; profile: ProfileModel; token: string };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthImplementationRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  beforeEach(() => {
    mockResponse = {
      user: {
        id: '1',
        email: 'johndoe@gmail.com',
        profile_id: '1',
      },
      profile: {
        id: '1',
        user_id: '12345',
        nick: 'JohnDoe',
        image: 'profile.jpg',
        date_birth: '1989-01-01',
        gender: GenderEnum.MALE,
        province_id: '001',
        country_id: 'US',
        online_status: true,
      },
      token: 'mock-token',
    };
  });

  beforeEach(() => {
    repository = TestBed.inject(AuthImplementationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call login API and process response correctly', () => {
    repository
      .login({ email: 'test@example.com', password: 'password' })
      .subscribe((res) => {
        expect(res.user.id).toBe('1');
        expect(res.profile.id).toBe('1');
        expect(res.token).toBe('mock-token');
      });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call register API and process response correctly', () => {
    repository
      .register({ email: 'test@example.com', password: 'password' })
      .subscribe((res) => {
        expect(res.user.id).toBe('1');
        expect(res.profile.id).toBe('1');
        expect(res.token).toBe('mock-token');
      });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should retrieve token from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');
    expect(repository.getAuthToken()).toBe('mock-token');
  });

  it('should return an observable of the token', (done) => {
    repository.listenAuthToken().subscribe((token) => {
      expect(token).toBe('mock-token');
      done();
    });
    repository.setAuthToken('mock-token');
  });

  it('should set token in local storage and update subject', () => {
    const spy = spyOn(localStorage, 'setItem');
    repository.setAuthToken('mock-token');
    expect(spy).toHaveBeenCalledWith('hexitalk_auth_token', 'mock-token');
  });

  it('should retrieve ID from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-id');
    expect(repository.getAuthId()).toBe('mock-id');
  });

  it('should return an observable of the ID', (done) => {
    repository.listenAuthId().subscribe((id) => {
      expect(id).toBe('mock-id');
      done();
    });
    repository.setAuthId('mock-id');
  });

  it('should set ID in local storage and update subject', () => {
    const spy = spyOn(localStorage, 'setItem');
    repository.setAuthId('mock-id');
    expect(spy).toHaveBeenCalledWith('hexitalk_auth_id', 'mock-id');
  });
});
