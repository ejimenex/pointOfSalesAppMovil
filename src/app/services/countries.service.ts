import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoints } from '../contansts/endpoint';
import { BaseService } from './base.service';
import { AccountModel } from '../model/account.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class CountriesService extends BaseService<any, string> {
  constructor(_httpClient: HttpClient, tokenService: TokenService) {
    super(_httpClient, environment.urlApi + endpoints.account, tokenService);
  }

  getCountries = () =>
    this._httpClient.get(
      environment.urlApi +
        `AllowredCountry`,
      this.httpOptions
    );
}
