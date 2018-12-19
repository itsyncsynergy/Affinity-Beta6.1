import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VipAccessPage } from './vip-access';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    VipAccessPage,
  ],
  imports: [
    IonicPageModule.forChild(VipAccessPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VipAccessPageModule {}
