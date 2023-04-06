import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../../app/contansts/endpoint';
import { BaseService } from './base.service';
import { unitOfMeasure } from '../model/unitOfMeasure.model';
import { ingredient } from '../model/ingredient.model';
import { TokenService } from './token.service';

@Injectable({providedIn:'root'})
export class IngredientService extends BaseService<ingredient, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.ingredient,tokenService);
  }
getPaged(pageNumber,filter){
  const user=this.tokenService.getUserToken().email;
  return this._httpClient.get(environment.url+endpoints.ingredient+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}`,this.httpOptions)}
}
