import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ParameterComponent } from './crud/parameter.crud.component';
import { ParameterRoutingModule } from './parameter.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ParameterRoutingModule
  ],
  declarations: [ParameterComponent]
})
export class ParameterModule {}
