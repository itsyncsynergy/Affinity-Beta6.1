import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileLeftPage } from './profile-left';

import { ParallaxLayout2Module } from '../../components/parallax/layout-2/parallax-layout-2.module';

@NgModule({
  declarations: [
    ProfileLeftPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(ProfileLeftPage),
    ParallaxLayout2Module
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileLeftPageModule {}
