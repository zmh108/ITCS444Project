import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavOrdersPageRoutingModule } from './fav-orders-routing.module';

import { FavOrdersPage } from './fav-orders.page';

import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavOrdersPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [FavOrdersPage]
})
export class FavOrdersPageModule {}
