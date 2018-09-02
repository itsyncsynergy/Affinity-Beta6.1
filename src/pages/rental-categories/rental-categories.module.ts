import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalCategoriesPage } from './rental-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    RentalCategoriesPage,
  ],
  imports: [
    MbscModule,
    SearchBarLayout1Module,
    IonicPageModule.forChild(RentalCategoriesPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RentalCategoriesPageModule { }
