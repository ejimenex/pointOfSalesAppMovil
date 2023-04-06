import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private tokenService: TokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (!this.verify()) {
      this._router.navigate(['/login/prelogin'], { queryParams: { returnUrl: state.url } });
      this.logout();
      return false;
    }

    if (this.getOne() !== null) {
      // logged in so return true
      return true;
    }
  }
  verify(): boolean {
    let currentUser = localStorage.getItem('accessToken');
    return currentUser != null && this.tokenService.isCurrentTokenValid();

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  getOne() {
    let currentUser = localStorage.getItem('accessToken');
    if (currentUser) {
      return currentUser;
    }
  }
}
