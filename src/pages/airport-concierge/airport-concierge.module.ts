import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirportConciergePage } from './airport-concierge';

@NgModule({
  declarations: [
    AirportConciergePage,
  ],
  imports: [
    IonicPageModule.forChild(AirportConciergePage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AirportConciergePageModule {}
