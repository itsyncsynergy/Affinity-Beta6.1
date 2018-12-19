import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightBookingPage } from './flight-booking';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    FlightBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightBookingPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlightBookingPageModule {}
