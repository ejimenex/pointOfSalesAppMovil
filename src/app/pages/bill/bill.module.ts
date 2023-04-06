import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreateBillComponent } from './create/bill.create.component';
import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';
import { BillRoutingModule } from './bill.route';
import { ListBillComponent } from './list/bill.list.component';
import { LogoComponent } from '../components/logo/logo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicInputMaskModule,
    TranslateModule,
    BillRoutingModule
  ],
  declarations: [ListBillComponent,CreateBillComponent,LogoComponent]
})
export class BillModule {}
