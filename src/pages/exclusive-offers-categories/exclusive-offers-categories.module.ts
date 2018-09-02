import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExclusiveOffersCategoriesPage } from './exclusive-offers-categories';

//import template for the page
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    ExclusiveOffersCategoriesPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ExclusiveOffersCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExclusiveOffersCategoriesPageModule {}
