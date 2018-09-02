import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetInvolvedPage } from './get-involved';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    GetInvolvedPage,
  ],
  imports: [
    IonicPageModule.forChild(GetInvolvedPage),
    GoogleCardLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetInvolvedPageModule {}
