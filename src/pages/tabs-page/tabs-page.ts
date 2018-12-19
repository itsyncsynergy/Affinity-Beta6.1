import { Component } from '@angular/core';

import { NavParams, IonicPage } from 'ionic-angular';
import { database } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: string = 'HomePage';
  tab2Root: string = 'SocialPage';
  tab3Root: string = 'PrivilegesPage';
  tab4Root: string = 'RedemptionPage';
  tab5Root: string = 'AffinityLifePage';
  mySelectedIndex: number;
  membership:any;
  data:any;

  constructor(navParams: NavParams) {
    this.membership = localStorage.getItem('membership');
    console.log(this.membership);
    console.log(window.localStorage.getItem('loggedIn'));
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    this.data = {
      "membership": this.membership,
      "status": window.localStorage.getItem('loggedIn')
    }
    
  }

}
