import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { GetAuthTokenUseCase } from '../../auth/use-cases/get-auth-token.usecase';
import { SetAuthTokenUseCase } from '../../auth/use-cases/set-auth-token.usecase';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const getAuthTokenUseCase: GetAuthTokenUseCase = inject(GetAuthTokenUseCase);
  const setAuthTokenUseCase: SetAuthTokenUseCase = inject(SetAuthTokenUseCase);

  const token: string = getAuthTokenUseCase.execute();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const body: any = event.body;
        const bodyToken = body?.token;
        const newToken = bodyToken?.replace('Bearer ', '');

        if (newToken) {
          setAuthTokenUseCase.execute(newToken);
        }
      }
    }),
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
