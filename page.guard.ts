import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthenticationService } from "./shared/services/authentication.service";

@Injectable({
    providedIn: "root",
})
export class PageGuard implements CanActivate {
    constructor(
        private _auth: AuthenticationService,
        private _router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._auth.getAuth().pipe(
            map((value, index) => {
                if(value.auth_email == null){
                    this._router.navigate(["/profile-authenticate"])
                    return false;
                }
                return true;
            }),
            catchError((err, caught) => {
                this._router.navigate(["/profile-authenticate"])
                return of(false);
            })
        );
    }
}
