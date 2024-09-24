import { distinctUntilChanged, Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { ProfileModel } from '../domain/models/profile.model';
import { ProfileRepository } from '../domain/repositories/profile.repository';
import { ProfileSocketService } from '../domain/socket/profiles-socket.service';

export class ListenProfileInfoUseCase
  implements UseCaseObservable<void, ProfileModel>
{
  constructor(private profileSocketService: ProfileSocketService) {}

  execute(): Observable<ProfileModel> {
    return this.profileSocketService.listenProfileInfo();
    // .pipe(
    //   distinctUntilChanged(
    //     (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
    //   )
    // );
  }
}
