import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AccountService } from './account.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.data.requireAuth) {
      if (this._accountService.isTokenExpired()) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
