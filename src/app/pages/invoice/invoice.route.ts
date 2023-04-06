import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateInvoiceComponent } from './create/invoice.view.component';
import { ListInvoiceComponent } from './list/invoice.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListInvoiceComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'view/:id',
    component: CreateInvoiceComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
