import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the AffinityLifePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-affinity-life',
  templateUrl: 'affinity-life.html',
})
export class AffinityLifePage {
  params: any = {};
  loading: Loading;

  // set the root pages for each tab
  tab1Root: string = 'VipAccessPage';
  tab2Root: string = 'EventTicketsPage';
  tab3Root: string = 'StylingPage';
  tab4Root: string = 'BeyondPage';
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    
  }
  swipeEvent(e) {
    if(e.direction == '2'){
       this.navCtrl.parent.select(2);
    }
    else if(e.direction == '4'){
       this.navCtrl.parent.select(0);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AffinityLifePage');
  }
  
}
