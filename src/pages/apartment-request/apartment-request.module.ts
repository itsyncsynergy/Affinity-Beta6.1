import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApartmentRequestPage } from './apartment-request';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    ApartmentRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ApartmentRequestPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApartmentRequestPageModule {}
