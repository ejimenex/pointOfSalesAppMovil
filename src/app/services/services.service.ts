import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { Service } from '../model/services.model';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class ServicesService extends BaseService<Service, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.service,tokenService);
  }
getPaged(pageNumber,filter){
  
  const user=this.tokenService.getUserToken().email;
  return this._httpClient.get(environment.url+endpoints.service+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}`,this.httpOptions)
}
}
