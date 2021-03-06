import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuxuryPackagePage } from './luxury-package';
import { ParallaxLayout2Module } from '../../components/parallax/layout-2/parallax-layout-2.module';
import { ImageGalleryLayout1Module } from '../../components/image-gallery/layout-1/image-gallery-layout-1.module';
import { SubImageGalleryModule } from '../../components/sub-image-gallery/sub-image-gallery.module';
import { FullScreenGalleryModule } from '../../components/full-screen-gallery/full-screen-gallery.module';

@NgModule({
  declarations: [
    LuxuryPackagePage,
  ],
  imports: [
    IonicPageModule.forChild(LuxuryPackagePage),
    ParallaxLayout2Module,
    ImageGalleryLayout1Module,
    SubImageGalleryModule,
    FullScreenGalleryModule
  ],
})
export class LuxuryPackagePageModule {}
