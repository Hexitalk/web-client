import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../shared/interceptors/auth.interceptor';
import { HubRepository } from '../domain/repositories/hub.repository';
import { GetHubUseCase } from '../use-cases/get-auth-profile.usecase';
import { HubImplementationRepository } from './repositories/hub-implementation.repository';

const getHubUseCaseFactory = (hubRepo: HubRepository) =>
  new GetHubUseCase(hubRepo);
export const getHubUseCaseProvider = {
  provide: GetHubUseCase,
  useFactory: getHubUseCaseFactory,
  deps: [HubRepository],
};

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    getHubUseCaseProvider,
    { provide: HubRepository, useClass: HubImplementationRepository },
  ],
  imports: [],
})
export class HubDataModule {}
