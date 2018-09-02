import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListwithsearchPage } from './listwithsearch';

//import template for the page
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';


@NgModule({
  declarations: [
    ListwithsearchPage,
  ],
  imports: [ 
    IonicPageModule.forChild(ListwithsearchPage),
    SearchBarLayout1Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListwithsearchPageModule {}
