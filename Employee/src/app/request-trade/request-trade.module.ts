import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestTradePageRoutingModule } from './request-trade-routing.module';

import { RequestTradePage } from './request-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestTradePageRoutingModule
  ],
  declarations: [RequestTradePage]
})
export class RequestTradePageModule {}
