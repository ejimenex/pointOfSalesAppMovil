import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class ParameterService extends BaseService<any, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.urlApi + endpoints.myData,tokenService);
  }
 
  getOneEmail = () =>
    this._httpClient.get(
      environment.urlApi + endpoints.myData+ `/GetById`,
      this.httpOptions
    );
}
