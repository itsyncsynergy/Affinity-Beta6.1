import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyEmailLayoutComponent } from './verify-email-layout';

@NgModule({
    declarations: [
        VerifyEmailLayoutComponent,
    ],
    imports: [
        IonicPageModule.forChild(VerifyEmailLayoutComponent),
    ],
    exports: [
        VerifyEmailLayoutComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class VerifyEmailLayoutComponentModule { }
