import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from './shared/services/authentication.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthenticationService,
    private _router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = window.localStorage.getItem(this._auth.jwtTokenKey)
    if (!!token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(request).pipe(
      map((value, index) => {
        return value
      }),
      catchError((err, caught) => {
        if (err.status == 401) {
          this._auth.logout()
        }
        return throwError(err)
      })
    );
  }
}
