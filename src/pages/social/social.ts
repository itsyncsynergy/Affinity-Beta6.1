import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})

export class SocialPage {
  // set the root pages for each tab
  tab1Root: string = 'ExperiencePage';
  tab2Root: string = 'AttendPage';
  tab3Root: string = 'PlayPage';
  tab4Root: string = 'JoinPage';
  tab5Root: string = 'GainPage';
  tab6Root: string = 'DonateVolunteerPage';
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivilegesPage');
  }

}

