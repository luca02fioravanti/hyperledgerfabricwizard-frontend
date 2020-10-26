import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AUTH_HEADER, AuthService, TOKEN_PREFIX} from './authService';
import {catchError} from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const update = {
      url: 'http://127.0.0.1:8080' + req.url,
      headers: undefined
    };
    if (token) {
      update.headers = req.headers.set(AUTH_HEADER, TOKEN_PREFIX + token);
    }
    return next.handle(req.clone(update)).pipe(catchError(err => {
      if ([400, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        this.authService.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }));
  }
}
