import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    Ng2SearchPipeModule,
    NgApexchartsModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
