import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { Service } from '../model/services.model';
import { TokenService } from './token.service';
import { Order } from '../model/order.model';

@Injectable({providedIn:'root'})
export class OrderService extends BaseService<Order, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.order,tokenService);
  }
getPaged(pageNumber,filter,status){
  
  const user=this.tokenService.getUserToken().email;
  return this._httpClient.get(environment.url+endpoints.order+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}&finished=${status}`,this.httpOptions)
}
}
