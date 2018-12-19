import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarsRequestPage } from './cars-request';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    CarsRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CarsRequestPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarsRequestPageModule {}
