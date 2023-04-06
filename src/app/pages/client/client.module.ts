import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClientRoutingModule } from './client.route';
import { ListClientComponent } from './list/client.list.component';
import { CreateClientComponent } from './create/client.create.component';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../components/logo/logo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ClientRoutingModule
  ],
  declarations: [ListClientComponent,CreateClientComponent,LogoComponent]
})
export class ClientModule {}
