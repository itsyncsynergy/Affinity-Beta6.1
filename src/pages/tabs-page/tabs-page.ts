import { Component } from '@angular/core';

import { NavParams, IonicPage } from 'ionic-angular';

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

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
