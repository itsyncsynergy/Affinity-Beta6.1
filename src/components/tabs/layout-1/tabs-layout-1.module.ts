import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { TabsLayout1 } from './tabs-layout-1';

@NgModule({
    declarations: [
        TabsLayout1,
    ],
    imports: [
        IonicPageModule.forChild(TabsLayout1),
        LivechatWidgetModule
    ],
    exports: [
        TabsLayout1
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TabsLayout1Module { }
