import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreateInvoiceComponent } from './create/invoice.view.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceRoutingModule } from './invoice.route';
import { ListInvoiceComponent } from './list/invoice.list.component';
import { LogoComponent } from '../components/logo/logo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InvoiceRoutingModule,IonicSelectableModule
  ],
  declarations: [CreateInvoiceComponent,ListInvoiceComponent,LogoComponent]
})
export class InvoiceModule {}
