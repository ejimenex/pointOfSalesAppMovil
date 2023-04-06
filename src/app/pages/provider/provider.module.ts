import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreateProviderComponent } from './add/add.page';
import { ListProviderComponent } from './list/provider.page';
import { ProviderRoutingModule } from './provider.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProviderRoutingModule
  ],
  declarations: [ListProviderComponent,CreateProviderComponent]
})
export class ProviderModule {}
