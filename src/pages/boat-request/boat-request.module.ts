import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoatRequestPage } from './boat-request';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    BoatRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(BoatRequestPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BoatRequestPageModule {}
