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
    super(_httpClient, environment.urlApi + endpoints.client,tokenService);
  }
getPaged(pageNumber,filter,isBlackList){
 return this._httpClient.get(environment.urlApi+endpoints.client+`/GetPaged?page=${pageNumber}&filter=${filter}&isBlackList=${isBlackList}`,this.httpOptions)}
}
