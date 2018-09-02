import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipOptionPage } from './membership-option';
import { RadioButtonLayout3Module } from '../../components/radio-button/layout-3/radio-button-layout-3.module';

@NgModule({
  declarations: [
    MembershipOptionPage,
  ],
  imports: [ 
    IonicPageModule.forChild(MembershipOptionPage),
    RadioButtonLayout3Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembershipOptionPageModule {}
