import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { TokenService } from './token.service';
import { InventoryIngredient } from '../model/inventoryIngredient.model';

@Injectable({providedIn:'root'})
export class InventoryIngredientService extends BaseService<InventoryIngredient, string> {

  constructor(_httpClient: HttpClient,tokenService:TokenService) {
    super(_httpClient, environment.url + endpoints.inventoryIngredient,tokenService);
  }
getPaged(pageNumber,filter){
  
  const user=this.tokenService.getUserToken().email;
  return this._httpClient.get(environment.url+endpoints.inventoryIngredient+`/GetPaginated/Data?pageNumber=${pageNumber}&filter=${filter}&email=${user}`,this.httpOptions)
}
substract=(id,quantity)=>this._httpClient.get(environment.url+endpoints.inventoryIngredient+`/substract/${id}/${quantity}`,this.httpOptions)
}
