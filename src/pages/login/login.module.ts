import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//template for the page 
import { LoginLayout1Module } from '../../components/login/layout-1/login-layout-1.module';

import { LoginPage } from './login';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [ 
        IonicPageModule.forChild(LoginPage),
        LoginLayout1Module
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule { }
