import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
    account:AccountModel=new AccountModel();
  constructor(
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private routeService: Router,
    private accountService:AccountService
  ) {}

  ngOnInit() {}
  add() {
    this.account.isGoogleEmail=false;
    this.accountService.post(this.account).subscribe(
      (response) => {
        this.alert.success('Creado exitosamente');
     
        this.account = new AccountModel();
        this.routeService.navigate(['/login']);
      },
      (error) => {
        this.alert.error(typeof(error.error.message)=='string'?error.error.message: error.error.message.join('-'));
      }
    );
  }
}
