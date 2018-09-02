import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantOfferPage } from './merchant-offer';
import { MapsLayout1Module } from '../../components/maps/layout-1/maps-layout-1.module';

@NgModule({
  declarations: [
    MerchantOfferPage,
  ],
  imports: [ 
    IonicPageModule.forChild(MerchantOfferPage),
    MapsLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MerchantOfferPageModule {}
