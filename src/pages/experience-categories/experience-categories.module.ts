import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceCategoriesPage } from './experience-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    ExperienceCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceCategoriesPageModule {}
