import { Observable } from 'rxjs';
import { HubModel } from '../models/hub.model';

export abstract class HubSocketService {
  abstract listenHubUpdate(): Observable<HubModel>;
}
