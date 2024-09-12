import { Observable } from 'rxjs';
import { UseCase } from '../../shared/base/use-case';
import { HubRepository } from '../domain/repositories/hub.repository';
import { HubModel } from '../domain/models/hub.model';

export class GetHubUseCase implements UseCase<void, HubModel | undefined> {
  constructor(private hubRepository: HubRepository) {}

  execute(): Observable<HubModel | undefined> {
    return this.hubRepository.getHub();
  }
}
