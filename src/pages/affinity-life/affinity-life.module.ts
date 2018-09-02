import { FormsModule } from '@angular/forms';


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AffinityLifePage } from './affinity-life';

//import template for the page
import { GoogleCardLayout1Module } from '../../components/list-view/google-card/layout-1/google-card-layout-1.module';

@NgModule({
  declarations: [
    AffinityLifePage,
  ],
  imports: [ 
    IonicPageModule.forChild(AffinityLifePage),
    GoogleCardLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AffinityLifePageModule { }
