import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierItemsPage } from './supplier-items.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierItemsPageRoutingModule {}
