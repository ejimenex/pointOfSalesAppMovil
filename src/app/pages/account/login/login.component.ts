import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
login:any={}

  constructor(
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private routeService: Router,    
    private accountService:AccountService,
    private tokenService:TokenService,
    private translate: TranslateService,
    private token:TokenService
  ) {}

  ngOnInit() {

  }
logon(){
  debugger
    this.accountService.login(this.login).subscribe(response=>{
       this.tokenService.setToken(response['token'] as string);
       const lang=this.token.getUserToken().language
       this.translate.setDefaultLang(lang);
        this.translate.use(lang);
       this.routeService.navigate(['/home']);

    },error=>{
        this.alert.error(error.error);
    })
}
 

}
