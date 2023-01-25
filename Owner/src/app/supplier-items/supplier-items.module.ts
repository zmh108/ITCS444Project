import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierItemsPageRoutingModule } from './supplier-items-routing.module';

import { SupplierItemsPage } from './supplier-items.page';

import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierItemsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SupplierItemsPage]
})
export class SupplierItemsPageModule {}
