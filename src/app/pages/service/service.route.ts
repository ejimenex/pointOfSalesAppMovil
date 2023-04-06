import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateServiceComponent } from './create/service.create.component';
import { ListServiceComponent } from './list/service.list.component';

const routes: Routes = [
  {
    path: '',
    component: ListServiceComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateServiceComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
