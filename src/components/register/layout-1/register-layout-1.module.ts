import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterLayout1 } from './register-layout-1';

import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
@NgModule({
    declarations: [
        RegisterLayout1,
    ],
    imports: [
        IonicPageModule.forChild(RegisterLayout1),
        FormsModule,
        MbscModule
    ],
    exports: [
        RegisterLayout1
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class RegisterLayout1Module { }
