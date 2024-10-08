import { Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ProfileModel } from '../domain/models/profile.model';
import { ProfileRepository } from '../domain/repositories/profile.repository';

export class GetAuthProfileUseCase
  implements UseCaseObservable<void, ProfileModel | undefined>
{
  constructor(private profileRepository: ProfileRepository) {}

  execute(): Observable<ProfileModel | undefined> {
    return this.profileRepository.getAuthProfile();
  }
}
