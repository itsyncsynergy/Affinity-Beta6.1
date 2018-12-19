import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalsPage } from './rentals';

//import template for the page
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    RentalsPage,
  ],
  imports: [
    MbscModule,
    IonicPageModule.forChild(RentalsPage),
    GoogleCardLayout1Module,
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RentalsPageModule { }
