import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeStylingPage } from './home-styling';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    HomeStylingPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeStylingPage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeStylingPageModule {}
