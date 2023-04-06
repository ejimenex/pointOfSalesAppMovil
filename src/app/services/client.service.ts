import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { Client } from '../model/client.model';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class ClientService extends BaseService<Client, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.client,tokenService);
  }
getPaged(pageNumber,filter,isBlackList){
  const user=this.tokenService.getUserToken().email;
 return this._httpClient.get(environment.url+endpoints.client+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}&isBlackList=${isBlackList}`,this.httpOptions)}
}
