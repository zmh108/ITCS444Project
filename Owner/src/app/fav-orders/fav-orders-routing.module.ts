import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavOrdersPage } from './fav-orders.page';

const routes: Routes = [
  {
    path: '',
    component: FavOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavOrdersPageRoutingModule {}
