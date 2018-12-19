import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuxuryPackagesPage } from './luxury-packages';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';

@NgModule({
  declarations: [
    LuxuryPackagesPage,
  ],
  imports: [
    IonicPageModule.forChild(LuxuryPackagesPage),
    SearchBarLayout1Module,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LuxuryPackagesPageModule {}
