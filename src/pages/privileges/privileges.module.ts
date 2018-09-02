import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivilegesPage } from './privileges';

//import template for the page
import { TabsLayout3Module } from '../../components/tabs/layout-3/tabs-layout-3.module';

@NgModule({
  declarations: [
    PrivilegesPage,
  ],
  imports: [ 
    IonicPageModule.forChild(PrivilegesPage)
    
  ]
})
export class PrivilegesPageModule {}
