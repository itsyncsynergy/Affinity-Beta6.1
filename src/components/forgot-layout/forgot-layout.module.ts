import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotLayoutComponent } from './forgot-layout';

@NgModule({
    declarations: [
        ForgotLayoutComponent,
    ],
    imports: [
        IonicPageModule.forChild(ForgotLayoutComponent),
    ],
    exports: [
        ForgotLayoutComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ForgotLayoutModule { }
