import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantOfferListPage } from './merchant-offer-list';
import { ParallaxLayout2Module } from '../../components/parallax/layout-2/parallax-layout-2.module';
import { MapsLayout2Module } from '../../components/maps/layout-2/maps-layout-2.module';
import { ImageGalleryLayout1Module } from '../../components/image-gallery/layout-1/image-gallery-layout-1.module';
import { SubImageGalleryModule } from '../../components/sub-image-gallery/sub-image-gallery.module';
import { FullScreenGalleryModule } from '../../components/full-screen-gallery/full-screen-gallery.module';

@NgModule({
  declarations: [
    MerchantOfferListPage,
  ],
  imports: [ 
    IonicPageModule.forChild(MerchantOfferListPage),
    ParallaxLayout2Module,
    MapsLayout2Module,
    ImageGalleryLayout1Module,
    SubImageGalleryModule,
    FullScreenGalleryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MerchantOfferListPageModule {}
