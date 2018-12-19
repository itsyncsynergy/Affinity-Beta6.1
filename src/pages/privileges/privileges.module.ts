import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivilegesPage } from './privileges';

@NgModule({
  declarations: [
    PrivilegesPage,
  ],
  imports: [ 
    IonicPageModule.forChild(PrivilegesPage)
    
  ]
})
export class PrivilegesPageModule {}
