import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-client',
  templateUrl: './myProfile.edit.component.html',
})
export class EditProfileComponent implements OnInit {
  account: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private tokenService: TokenService,
    private alert: AlertService,
    private routeService: Router,
    private translate:TranslateService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    const email = this.tokenService.getUserToken().email;
    console.log(email);
    this.accountService.getOneEmail(email).subscribe((c) => {
      this.account = c;
    });
  }

  update() {
    this.alert.confirmation(() => {
      this.accountService.put(this.account._id, this.account).subscribe(
        (response) => {
          this.translate.setDefaultLang(this.account.language);
          this.translate.use(this.account.language);
          this.alert.success('Success');
        },
        (error) => {
            this.alert.error(typeof(error.error.message)=='string'?error.error.message : error.error.message.join('-'));
        }
      );
    }, 'Desea cambiar sus datos?');
  }
  goBack() {
    this.routeService.navigateByUrl('/client');
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
}
