import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OrdersRoutingModule } from './orders.route';
import {  ListOrdersComponent } from './list/orders.list.component';
import { CreateSOrdersComponent } from './create/orders.create.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../components/logo/logo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OrdersRoutingModule,IonicSelectableModule
  ],
  declarations: [CreateSOrdersComponent,ListOrdersComponent,LogoComponent]
})
export class OrdersModule {}
