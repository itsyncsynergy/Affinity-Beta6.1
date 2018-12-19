import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StylingPage } from './styling';

@NgModule({
  declarations: [
    StylingPage,
  ],
  imports: [
    IonicPageModule.forChild(StylingPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StylingPageModule {}
