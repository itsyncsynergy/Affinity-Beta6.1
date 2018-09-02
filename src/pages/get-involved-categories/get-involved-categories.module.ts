import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetInvolvedCategoriesPage } from './get-involved-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    GetInvolvedCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(GetInvolvedCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetInvolvedCategoriesPageModule {}
