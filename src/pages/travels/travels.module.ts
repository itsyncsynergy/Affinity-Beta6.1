import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelsPage } from './travels';

//import template for the page

@NgModule({
  declarations: [
    TravelsPage,
  ],
  imports: [ 
     
    
    IonicPageModule.forChild(TravelsPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelsPageModule { }
