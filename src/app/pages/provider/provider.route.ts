import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';
import { CreateProviderComponent } from './add/add.page';
import { ListProviderComponent } from './list/provider.page';

const routes: Routes = [
  {
    path: '',
    component: ListProviderComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'create/:id',
    component: CreateProviderComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
