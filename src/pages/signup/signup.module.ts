import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

//template for the page 
import { RegisterLayout1Module } from '../../components/register/layout-1/register-layout-1.module';
@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [ 
     
    
        IonicPageModule.forChild(SignupPage),
        RegisterLayout1Module
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupPageModule { }
