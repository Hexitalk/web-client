import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { ProfileModel } from '../domain/models/profile.model';
import { ProfileRepository } from '../domain/repositories/profile.repository';

export class SetAuthProfileUseCase implements UseCase<ProfileModel, void> {
  constructor(private profileRepository: ProfileRepository) {}

  execute(params: ProfileModel): void {
    this.profileRepository.setAuthProfile(params);
  }
}
