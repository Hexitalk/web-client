import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { MainSocketService } from '../domain/socket/main-socket.service';

export class ListenErrorSocketUseCase implements UseCase<string, void> {
  constructor(private mainSocketService: MainSocketService) {}

  /**
   * Description
   *
   * @param
   * @returns
   */
  execute(): Observable<void> {
    return this.mainSocketService.onError();
  }
}