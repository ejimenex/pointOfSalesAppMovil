import { Injectable } from '@angular/core';
import { IService } from './iService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

export class BaseService<TEntity, TKey> implements IService<TEntity, TKey> {

  protected pageZise = 5;

  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(value: string) {
    this._baseUrl = value;
  }
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer `+localStorage.getItem('access_token')
    })
  };

  constructor(protected _httpClient: HttpClient, private _baseUrl: string,public tokenService:TokenService) { }

  getAll(): Observable<TEntity[]> {
    const user=this.tokenService.getUserToken();
    let data =this._httpClient.get<TEntity[]>(this.baseUrl+'/getAll/'+user.email,this.httpOptions);
    return  this.requestResolver(data);
  }

  getById(id: string): Observable<TEntity> {
    return this._httpClient.get<TEntity>(this.baseUrl +'/'+ id,this.httpOptions);
  }
  

  post(entity: TEntity): Observable<Object> {
    const user=this.tokenService.getUserToken();
    // if(user){
    //   entity['email']=user.email
    // }
  
    return this._httpClient.post(this.baseUrl, entity, this.httpOptions);
  }
 

  patch(entity: TEntity, id: TKey): Observable<Object> {
    return this._httpClient
      .patch(this.baseUrl + id, entity,this.httpOptions);
  }

  put(id: TKey, entity: TEntity,): Observable<Object> {
    return this._httpClient
      .put(this.baseUrl, entity,this.httpOptions);
  }
 
  delete(id: TKey): Observable<Object> {
    return this._httpClient.delete(this.baseUrl +"/"+ id,this.httpOptions);
  }
  


  requestResolver(request: any) : Observable<TEntity[]> {
    let entity = from<TEntity[][]>(request.pipe(map (d=> d["data"])))

    if(!(entity)) {
      return entity;
    }

    return request;
   }
}
