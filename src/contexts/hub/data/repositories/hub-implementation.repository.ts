import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubModel } from '../../domain/models/hub.model';
import { environment } from '../../../../environments/environment.prod';
import { HubRepository } from '../../domain/repositories/hub.repository';
import { HubImplementationRepositoryMapper } from './mappers/hub-repository.mapper';
import { HubEntity } from './entities/hub-entity';

@Injectable({
  providedIn: 'root',
})
export class HubImplementationRepository extends HubRepository {
  hubMapper = new HubImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getHub(): Observable<HubModel> {
    return this.http
      .post<HubEntity>(`${environment.apiUrl}/auth/register`, {})
      .pipe(
        map((res) => {
          return this.hubMapper.mapFrom(res);
        })
      );
  }

  // getHub(): Observable<HubModel> {
  //   return new Observable<HubModel>((observer) => {
  //     observer.next(this.hub);
  //     observer.complete();
  //   });
  // }
}
