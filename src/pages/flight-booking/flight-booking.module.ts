import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightBookingPage } from './flight-booking';

@NgModule({
  declarations: [
    FlightBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightBookingPage),
  ],
})
export class FlightBookingPageModule {}
