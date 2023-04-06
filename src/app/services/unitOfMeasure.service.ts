import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../../app/contansts/endpoint';
import { BaseService } from './base.service';
import { unitOfMeasure } from '../model/unitOfMeasure.model';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class UnitOfMeasuerService extends BaseService<unitOfMeasure, number> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.unitOfMeasure,tokenService);
  }
  getAllUoM() {
    return this._httpClient.get(environment.url+endpoints.unitOfMeasure,this.httpOptions)
  }
  }

