import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialWirePage } from './social-wire';
import { IonicImageLoader } from 'ionic-image-loader';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    SocialWirePage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(SocialWirePage),
    MbscModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialWirePageModule {}
