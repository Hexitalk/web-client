import { distinctUntilChanged, Observable } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { HubModel } from '../domain/models/hub.model';
import { HubSocketService } from '../domain/socket/hub-socket.service';

export class ListenHubUpdateUseCase
  implements UseCaseObservable<void, HubModel>
{
  constructor(private hubSocketService: HubSocketService) {}

  execute(): Observable<HubModel> {
    return this.hubSocketService.listenHubUpdate();
    // .pipe(
    //   distinctUntilChanged(
    //     (prev, current) => JSON.stringify(prev) === JSON.stringify(current)
    //   )
    // );
  }
}
