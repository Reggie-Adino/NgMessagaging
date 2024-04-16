import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenserv = inject(TokenService);
  const router = inject(Router);

  if (tokenserv.getToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenserv.getToken()}`,
      },
    });
  }
  return next(req).pipe(
    retry(2),
    catchError((e:HttpErrorResponse) => {
      if (e.status === 401) {
        tokenserv.removeToken();
        router.navigate([''])
      }
      const error = e.error?.message || e.statusText;
      return throwError(() => error)
      
    })
  );
};
