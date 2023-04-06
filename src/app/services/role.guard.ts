import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private _router: Router, private tokenService: TokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    // this will be passed from the route config
    // on the data property
    const isActive = this.tokenService.isCurrentTokenValid();
    if (isActive) {
      return true;
    }
    else {
      this._router.navigate(['/login/prelogin']);
      return false;
    }

  }
}
