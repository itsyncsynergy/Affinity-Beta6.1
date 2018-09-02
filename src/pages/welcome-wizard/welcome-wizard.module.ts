import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeWizardPage } from './welcome-wizard';
import { WizardLayout3Module } from '../../components/wizard/layout-3/wizard-layout-3.module';

@NgModule({
  declarations: [
    WelcomeWizardPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(WelcomeWizardPage),
    WizardLayout3Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomeWizardPageModule {}
