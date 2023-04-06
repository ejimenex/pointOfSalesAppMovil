import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IngredientRoutingModule } from './ingredient.route';
import { ListIngredientComponent } from './list/ingredient.list.component';
import { CreateIngredientComponent } from './create/ingredient.create.component';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../components/logo/logo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    IngredientRoutingModule
  ],
  declarations: [CreateIngredientComponent,ListIngredientComponent,LogoComponent]
})
export class IngredientModule {}
