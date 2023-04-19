import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClientRoutingModule } from './client.route';
import { ListClientComponent } from './list/client.list.component';
import { CreateClientComponent } from './create/client.create.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ClientRoutingModule
  ],
  declarations: [ListClientComponent,CreateClientComponent]
})
export class ClientModule {}
