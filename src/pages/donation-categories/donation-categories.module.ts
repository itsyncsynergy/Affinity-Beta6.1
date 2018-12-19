import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationCategoriesPage } from './donation-categories';
import { SearchBarLayout2Module } from '../../components/search-bar/layout-2/search-bar-layout-2.module';

@NgModule({
  declarations: [
    DonationCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationCategoriesPage),
    SearchBarLayout2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonationCategoriesPageModule {}
