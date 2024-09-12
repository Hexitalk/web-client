import { CanMatchFn, Router } from '@angular/router';
import { GetAuthTokenUseCase } from '../../auth/use-cases/get-auth-token.usecase';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authLazyGuard: CanMatchFn = (route, segments) => {
  const router: Router = inject(Router);
  const getAuthTokenUseCase: GetAuthTokenUseCase = inject(GetAuthTokenUseCase);

  return getAuthTokenUseCase.execute().pipe(
    map((token: string) => {
      if (token) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
