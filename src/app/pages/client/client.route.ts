import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateClientComponent } from './create/client.create.component';
import { ListClientComponent } from './list/client.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListClientComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateClientComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
