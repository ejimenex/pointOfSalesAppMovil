import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  appPages =[
    { title: this.translate.instant('myData'), url: `/parameter/crud/${this.token.getUserToken().email}`, icon: 'settings' },
    { title: this.translate.instant('ingredient'), url: '/ingredient', icon: 'fast-food' },
  { title: this.translate.instant('service'), url: '/services', icon: 'paper-plane' },
  { title: this.translate.instant('client'), url: '/client', icon: 'people' },
  { title: this.translate.instant('inventoryIngredient'), url: '/inventoryIngredient', icon: 'pricetag' },
  { title: this.translate.instant('orders'), url: '/orders', icon: 'fast-food' },
  { title: this.translate.instant('invoices'), url: '/invoice', icon: 'card' },
  { title: this.translate.instant('providers'), url: '/provider', icon: 'people' },
  { title: this.translate.instant('bills'), url: '/bill', icon: 'cash' }];
  email=''
  lang=''

  constructor(private token:TokenService,private _router: Router,private translate: TranslateService) {
    this.lang=this.token.getUserToken().language
   translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  
  }
  ngOnInit(){

    this.email = this.token.getUserToken().email

    
  }
  exit(){
    this.token.removeCurrentToken()
    this._router.navigate(['/login/prelogin']);
  }
}
