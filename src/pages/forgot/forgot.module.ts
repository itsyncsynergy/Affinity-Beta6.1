import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//template for the page 
import { ForgotLayoutModule } from '../../components/forgot-layout/forgot-layout.module';

import { ForgotPage } from './forgot';

@NgModule({
  declarations: [
    ForgotPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ForgotPage),
    ForgotLayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgotPageModule {}
