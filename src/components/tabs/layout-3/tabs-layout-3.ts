import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'tabs-layout-3',
    templateUrl: 'tabs.html',
        styles: [
            `
            .tabbar a[aria-selected=true] {
            border-bottom: 1px;
            border-style: solid;    
            }`
        ]
})
export class TabsLayout3 {
    @Input('data') data: any;
    @Input('events') events: any;
    @ViewChild('tabs') tabRef: any;

    constructor() { }

}
