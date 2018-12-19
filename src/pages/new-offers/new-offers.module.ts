import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOffersPage } from './new-offers';
import { IonicImageLoader } from 'ionic-image-loader';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    NewOffersPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(NewOffersPage),
    MbscModule
  ],
})
export class NewOffersPageModule {}
