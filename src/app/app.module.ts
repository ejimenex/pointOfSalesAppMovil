import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RoleGuard } from './services/role.guard';
import { TokenService } from './services/token.service';
import { LogOutComponent } from './pages/logout/logout.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LogoComponent } from './pages/components/logo/logo';
export function token() {
  const currentUser = localStorage.getItem('access_token');
  return currentUser;
}
@NgModule({
  declarations: [AppComponent, LogOutComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      },
  }),
    IonicSelectableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: token,
      },
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RoleGuard,
    TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}