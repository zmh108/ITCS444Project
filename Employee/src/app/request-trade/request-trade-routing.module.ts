import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestTradePage } from './request-trade.page';

const routes: Routes = [
  {
    path: '',
    component: RequestTradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestTradePageRoutingModule {}
