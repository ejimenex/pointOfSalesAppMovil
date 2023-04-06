import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateSOrdersComponent } from './create/orders.create.component';
import { ListOrdersComponent } from './list/orders.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrdersComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateSOrdersComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
