import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelConciergePage } from './travel-concierge';

@NgModule({
  declarations: [
    TravelConciergePage,
  ],
  imports: [
    IonicPageModule.forChild(TravelConciergePage),
  ],
})
export class TravelConciergePageModule {}
