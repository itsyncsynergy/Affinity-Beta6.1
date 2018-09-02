import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonatePage } from './donate';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    DonatePage,
  ],
  imports: [
    IonicPageModule.forChild(DonatePage),
    GoogleCardLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonatePageModule {}
