import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ServiceRoutingModule } from './service.route';
import {  ListServiceComponent } from './list/service.list.component';
import { CreateServiceComponent } from './create/service.create.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceRoutingModule,IonicSelectableModule
  ],
  declarations: [CreateServiceComponent,ListServiceComponent]
})
export class ServiceModule {}
