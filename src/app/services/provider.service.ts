import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { TokenService } from './token.service';
import { Provider } from '../model/providers';

@Injectable({providedIn:'root'})
export class ProviderService extends BaseService<Provider, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.provider,tokenService);
  }
getPaged(pageNumber,filter){
  const user=this.tokenService.getUserToken().email;
 return this._httpClient.get(environment.url+endpoints.provider+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}`,this.httpOptions)}
}
