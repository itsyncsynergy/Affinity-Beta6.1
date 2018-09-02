import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerPage } from './volunteer';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    VolunteerPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerPage),
    GoogleCardLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VolunteerPageModule {}
