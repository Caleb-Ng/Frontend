import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private $sessionStorage: SessionStorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //const token = window.localStorage.getItem(this._auth.jwtTokenKey)
    const token = this.$sessionStorage.retrieve('authenticationToken');
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
