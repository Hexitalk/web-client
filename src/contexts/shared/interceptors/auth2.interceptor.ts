import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const auth2Interceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor2 ...');

  return next(req).pipe(
    tap({
      next: (event) => {
        // Aquí puedes registrar la respuesta o cualquier otro evento
        console.log('Response Event:', event);
      },
      error: (error) => {
        // Aquí puedes manejar errores si es necesario
        console.error('Error Occurred:', error);
      },
    })
  );
};
