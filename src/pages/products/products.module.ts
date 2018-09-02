import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ProductsPage),
    GoogleCardLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsPageModule {}
