import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirportConciergePage } from './airport-concierge';

@NgModule({
  declarations: [
    AirportConciergePage,
  ],
  imports: [
    IonicPageModule.forChild(AirportConciergePage),
  ],
})
export class AirportConciergePageModule {}
