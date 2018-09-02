import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AffinityLifeCategoriesPage } from './affinity-life-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    AffinityLifeCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AffinityLifeCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AffinityLifeCategoriesPageModule {}
