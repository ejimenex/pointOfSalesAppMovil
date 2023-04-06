import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateInventoryIngredientComponent } from './create/inventoryIngredient.create';
import { ListInventoryIngredientComponent } from './list/inventoryIngredient.list.component';
import { DetailInventoryIngredientComponent } from './detaill/historical.component';
import { AjustInventoryIngredientComponent } from './ajust/inventoryIngredient.ajust';

const routes: Routes = [
  {
    path: '',
    component: ListInventoryIngredientComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateInventoryIngredientComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'historical/:id',
    component: DetailInventoryIngredientComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'adjust/:id',
    component: AjustInventoryIngredientComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryIngredientRoutingModule {}
