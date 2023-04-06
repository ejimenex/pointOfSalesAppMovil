import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateBillComponent } from './create/bill.create.component';
import { ListBillComponent } from './list/bill.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListBillComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateBillComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {}
