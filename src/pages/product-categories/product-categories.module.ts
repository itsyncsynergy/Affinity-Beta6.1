import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCategoriesPage } from './product-categories';
import { SearchBarLayout2Module } from '../../components/search-bar/layout-2/search-bar-layout-2.module';

@NgModule({
  declarations: [
    ProductCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCategoriesPage),
    SearchBarLayout2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCategoriesPageModule {}
