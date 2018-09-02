import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExclusiveOffersPage } from './exclusive-offers';

//import template for the page
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    ExclusiveOffersPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ExclusiveOffersPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExclusiveOffersPageModule {}
