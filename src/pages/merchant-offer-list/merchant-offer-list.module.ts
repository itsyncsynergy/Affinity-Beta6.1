import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantOfferListPage } from './merchant-offer-list';
import { ParallaxLayout2Module } from '../../components/parallax/layout-2/parallax-layout-2.module';
import { MapsLayout2Module } from '../../components/maps/layout-2/maps-layout-2.module';

@NgModule({
  declarations: [
    MerchantOfferListPage,
  ],
  imports: [ 
    IonicPageModule.forChild(MerchantOfferListPage),
    ParallaxLayout2Module,
    MapsLayout2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MerchantOfferListPageModule {}
