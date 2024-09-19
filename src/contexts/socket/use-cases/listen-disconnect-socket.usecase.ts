import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UseCaseObservable } from '../../shared/base/use-case';
import { MainSocketService } from '../domain/socket/main-socket.service';

export class ListenDisconnectSocketUseCase
  implements UseCaseObservable<string, void>
{
  constructor(private mainSocketService: MainSocketService) {}

  /**
   * Description
   *
   * @param
   * @returns
   */
  execute(): Observable<void> {
    return this.mainSocketService.onDisconnect();
  }
}
