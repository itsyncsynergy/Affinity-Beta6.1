import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VipAccessCategoriesPage } from './vip-access-categories';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    VipAccessCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(VipAccessCategoriesPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VipAccessCategoriesPageModule {}
