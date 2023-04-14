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
    super(_httpClient, environment.urlApi + endpoints.provider,tokenService);
  }
getPaged(pageNumber,filter){
 return this._httpClient.get(environment.urlApi+endpoints.provider+`/GetPaged?page=${pageNumber}&filter=${filter}`,this.httpOptions)}
}
