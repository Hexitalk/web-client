import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { MainSocketService } from '../domain/socket/main-socket.service';

export class DisconnectSocketUseCase implements UseCase<string, void> {
  constructor(private mainSocketService: MainSocketService) {}

  /**
   * Description
   *
   * @param
   * @returns
   */
  execute(): void {
    this.mainSocketService.disconnect();
  }
}
