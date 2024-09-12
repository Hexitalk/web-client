import { Observable } from 'rxjs';
import { HubModel } from '../models/hub.model';

export abstract class HubRepository {
  abstract getHub(): Observable<HubModel>;
}
