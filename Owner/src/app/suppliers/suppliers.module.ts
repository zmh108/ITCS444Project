import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuppliersPageRoutingModule } from './suppliers-routing.module';

import { SuppliersPage } from './suppliers.page';

import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuppliersPageRoutingModule,
    Ng2SearchPipeModule,
    
  ],
  declarations: [SuppliersPage]
})
export class SuppliersPageModule {}
