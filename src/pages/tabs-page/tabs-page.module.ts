import { FormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs-page';

//load template for the page
import { TabsLayout1Module } from '../../components/tabs/layout-1/tabs-layout-1.module';
import { LivechatWidgetModule } from '../../../node_modules/@livechat/angular-widget';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [ 
     
    
        IonicPageModule.forChild(TabsPage),
        TabsLayout1Module,
        LivechatWidgetModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPageModule { }
