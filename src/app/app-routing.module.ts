import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServiceModule)
  },
  {
    path: 'inventoryIngredient',
    loadChildren: () => import('./pages/inventoryIngredient/inventoryIngredient.module').then( m => m.InventoryIngredientModule)
  },
  {
    path: 'provider',
    loadChildren: () => import('./pages/provider/provider.module').then( m => m.ProviderModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./pages/bill/bill.module').then( m => m.BillModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./pages/invoice/invoice.module').then( m => m.InvoiceModule)
  },
  {
    path: 'parameter',
    loadChildren: () => import('./pages/parameter/parameter.module').then( m => m.ParameterModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/myPerfil/myPerfil.module').then( m => m.ProfileModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/account.module').then(m=> m.AccountModule)
  },
  {
    path: 'ingredient',
    loadChildren: () => import('./pages/ingredient/ingredient.module').then( m => m.IngredientModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
