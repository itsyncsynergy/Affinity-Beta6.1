import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { ParallaxLayout4Module } from '../../components/parallax/layout-4/parallax-layout-4.module';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    ParallaxLayout4Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPageModule {}
