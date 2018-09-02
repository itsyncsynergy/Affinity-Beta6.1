import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'tabs-layout-1',
    templateUrl: 'tabs.html'
})
export class TabsLayout1 {
    @Input('data') data: any;
    @Input('events') events: any;
    @ViewChild('tabs') tabRef: any;
    //@Input('user') user: any;
    user: any = {}
    constructor() {
        this.user = {
            'name': 'Samuel Ibeh',
            'color': '#6A0608',
        }
     }

    onProfile() {
         
    }
}
