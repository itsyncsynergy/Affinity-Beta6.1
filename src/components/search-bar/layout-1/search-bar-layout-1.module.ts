import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { SearchBarLayout1 } from './search-bar-layout-1';

@NgModule({
    declarations: [
        SearchBarLayout1,
    ],
    imports: [
        IonicPageModule.forChild(SearchBarLayout1),
        IonicImageLoader
    ],
    exports: [
        SearchBarLayout1
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SearchBarLayout1Module { }
