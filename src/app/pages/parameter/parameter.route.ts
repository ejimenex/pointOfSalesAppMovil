import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/services/role.guard';import { ParameterComponent } from './crud/parameter.crud.component';

const routes: Routes = [

  {
    path: 'crud/:id',
    component: ParameterComponent,
    canActivate: [RoleGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterRoutingModule {}
