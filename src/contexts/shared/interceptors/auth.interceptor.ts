import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
// import { UsuariosService } from '../services/usuarios.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { GetAuthTokenUseCase } from '../../auth/use-cases/get-auth-token.usecase';
import { SetAuthTokenUseCase } from '../../auth/use-cases/set-auth-token.usecase';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const getAuthTokenUseCase: GetAuthTokenUseCase = inject(GetAuthTokenUseCase);
  const setAuthTokenUseCase: SetAuthTokenUseCase = inject(SetAuthTokenUseCase);

  // Obtén el token de manera reactiva (es un Observable)
  return getAuthTokenUseCase.execute().pipe(
    switchMap((token: string) => {
      // Clonar la solicitud con el token obtenido
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Continúa con la solicitud interceptada
      return next(authReq).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            // Obtén el nuevo token del cuerpo de la respuesta (si existe)
            const body: any = event.body;
            const newToken = body?.token;

            if (newToken) {
              // Actualiza el token en la app sin el prefijo 'Bearer '
              setAuthTokenUseCase.execute(newToken.replace('Bearer ', ''));
            }
          }
        }),
        catchError((error) => {
          // Manejo de errores (opcionalmente podrías hacer un refresh token aquí)
          return throwError(() => error);
        })
      );
    })
  );
};

// return next(authReq).pipe(
//   catchError((err) => {
//     return usuariosService.refreshToken().pipe(
//       switchMap((res) => {
//         // Guardar el nuevo token
//         localStorage.setItem('token', res.accessToken);

//         const newReq = req.clone({
//           setHeaders: {
//             Authorization: res.accessToken
//           }
//         });

//         return next(newReq);
//       }),
//       catchError((refreshErr) => {
//         const finalError = new Error(refreshErr);

//         localStorage.removeItem('token');
//         localStorage.removeItem('refreshToken');

//         return throwError(() => finalError);
//       })
//     )
//   })
// );
