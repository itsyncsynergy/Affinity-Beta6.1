import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsTicketsListPage } from './events-tickets-list';
import { ParallaxLayout2Module } from '../../components/parallax/layout-2/parallax-layout-2.module';
import { FullScreenGalleryModule } from '../../components/full-screen-gallery/full-screen-gallery.module';
import { SubImageGalleryModule } from '../../components/sub-image-gallery/sub-image-gallery.module';
import { ImageGalleryLayout1Module } from '../../components/image-gallery/layout-1/image-gallery-layout-1.module';

@NgModule({
  declarations: [
    EventsTicketsListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsTicketsListPage),
    ParallaxLayout2Module,
    ImageGalleryLayout1Module, 
    SubImageGalleryModule, 
    FullScreenGalleryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsTicketsListPageModule {}
