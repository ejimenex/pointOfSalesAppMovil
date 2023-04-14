import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
    account:AccountModel=new AccountModel();
    countries=[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private countrieService:CountriesService,
    private alert: AlertService,
    private routeService: Router,
    private accountService:AccountService
  ) {}

  ngOnInit() {
    this.countrieService.getCountries().subscribe(response=>{
      this.countries=response as []
    })
  }
  add() {
    this.accountService.post(this.account).subscribe(
      (response) => {
        this.alert.success('Creado exitosamente');
     
        this.account = new AccountModel();
        this.routeService.navigate(['/login']);
      },
      (error) => {
        this.alert.error( error.error);
      }
    );
  }
}
