import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { PreLoginComponent } from './prelogin/prelogin.component';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './account.route';
import { TokenService } from 'src/app/services/token.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegisterRoutingModule],
  declarations: [
    LoginComponent,
    PreLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
  ],
  providers:[TokenService]
})
export class AccountModule {}
