import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenericBookingPage } from './generic-booking';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    GenericBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(GenericBookingPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GenericBookingPageModule {}
