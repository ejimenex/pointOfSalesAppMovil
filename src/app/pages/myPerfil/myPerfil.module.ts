import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {  EditProfileComponent} from './edit/myProfile.edit.component';
import { ProfileRoutingModule } from './myPerfil.router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRoutingModule
  ],
  declarations: [EditProfileComponent]
})
export class ProfileModule {}
