import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateIngredientComponent } from './create/ingredient.create.component';
import { ListIngredientComponent } from './list/ingredient.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListIngredientComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateIngredientComponent,
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRoutingModule {}
