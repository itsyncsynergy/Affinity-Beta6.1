import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeyondPage } from './beyond';

@NgModule({
  declarations: [
    BeyondPage,
  ],
  imports: [
    IonicPageModule.forChild(BeyondPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeyondPageModule {}
