
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode'
@Injectable({providedIn:'root'})
export class TokenService {
  constructor(public jwtHelper: JwtHelperService) { }

  public setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  public removeCurrentToken() {
    localStorage.removeItem('access_token');
  }
  getDecodedAccessToken(token: string): any {
      return jwt_decode(token);
    
  }
  public isCurrentTokenValid(): boolean {
    const token =  localStorage.getItem('access_token')
    if(!token) return false;
    let valid=this.getDecodedAccessToken(token);
    return token && !this.jwtHelper.isTokenExpired();
  }

  public getUserToken(): any {
    if (!this.jwtHelper.tokenGetter()) {
      return {};
    }
    const tokenPayload = this.jwtHelper.decodeToken();
    if (!tokenPayload) {
      return null;
    }
       let user: any = {
      email: tokenPayload.email,
      language: tokenPayload.language,
      fullName: tokenPayload.fullName,
      alias: tokenPayload.alias
    };
    return user;
  }

//   public getPermissions(): string[] {
//     if (!this.jwtHelper.tokenGetter()) {
//       return [];
//     }
//     const tokenPayload = this.jwtHelper.decodeToken();

//     if (!tokenPayload) {
//       return [];
//     }
//     const permissions = tokenPayload.Permissions as string[];
//     return permissions;
//   }
}
