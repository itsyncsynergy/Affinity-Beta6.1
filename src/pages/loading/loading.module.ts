import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SplashScreenLayout3Module } from '../../components/splash-screen/layout-3/splash-screen-layout-3.module';
import { LoadingPage } from './loading';

@NgModule({
  declarations: [
    LoadingPage,
  ],
  imports: [ 
    IonicPageModule.forChild(LoadingPage),
    SplashScreenLayout3Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoadingPageModule {}
