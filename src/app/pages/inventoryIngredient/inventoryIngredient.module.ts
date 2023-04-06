import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreateInventoryIngredientComponent } from './create/inventoryIngredient.create';
import { IonicSelectableModule } from 'ionic-selectable';
import { ListInventoryIngredientComponent } from './list/inventoryIngredient.list.component';
import { InventoryIngredientRoutingModule } from './inventoryIngredient.route';
import { TranslateModule } from '@ngx-translate/core';
import { DetailInventoryIngredientComponent } from './detaill/historical.component';
import { AjustInventoryIngredientComponent } from './ajust/inventoryIngredient.ajust';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InventoryIngredientRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [
    CreateInventoryIngredientComponent,
    ListInventoryIngredientComponent,
    DetailInventoryIngredientComponent,
    AjustInventoryIngredientComponent
  ],
})
export class InventoryIngredientModule {}
