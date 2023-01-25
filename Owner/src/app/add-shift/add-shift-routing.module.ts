import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddShiftPage } from './add-shift.page';

const routes: Routes = [
  {
    path: '',
    component: AddShiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddShiftPageRoutingModule {}
