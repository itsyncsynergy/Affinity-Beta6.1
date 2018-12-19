import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterestPage } from './interest';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    InterestPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterestPageModule {}
