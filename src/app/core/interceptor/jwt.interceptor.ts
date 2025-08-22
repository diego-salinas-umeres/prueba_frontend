import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token && !req.url.endsWith('/users/login') && !req.url.endsWith('/users/register')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
