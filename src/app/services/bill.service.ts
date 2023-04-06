import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { TokenService } from './token.service';
import { Bill } from '../model/bill.model';

@Injectable({providedIn:'root'})
export class BillService extends BaseService<Bill, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.bill,tokenService);
  }
getPaged(pageNumber,dateTo,dateFrom){
  const user=this.tokenService.getUserToken().email;
 return this._httpClient.get(environment.url+endpoints.bill+`/GetPaginated/Data?pageNumber=${pageNumber}&dateTo=${dateTo}&dateFrom=${dateFrom}&email=${user}`,this.httpOptions)}
}
