import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperiencePage } from './experience';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    ExperiencePage,
  ],
  imports: [ 
    IonicPageModule.forChild(ExperiencePage),
    GoogleCardLayout1Module,
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperiencePageModule {}
