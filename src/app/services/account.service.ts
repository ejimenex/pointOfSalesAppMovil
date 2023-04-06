import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { AccountModel } from '../model/account.model';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class AccountService extends BaseService<AccountModel, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.account,tokenService);
  }
  login=(data)=>this._httpClient.post(environment.url+endpoints.account+`/auth/Login`,data)
  getOneEmail=(email)=>this._httpClient.get(environment.url+endpoints.account+`/GetOne?email=${email}`,this.httpOptions)
getOne=(filter)=>this._httpClient.get(environment.url+endpoints.account+`/GetOne?email=${filter.email}&password=${filter.password}`,this.httpOptions)
}
