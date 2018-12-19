import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  params: any = {};
  loading: Loading;

  tab1Root: string = 'FeedsPage';
  tab2Root: string = 'SocialWirePage';
  tab3Root: string = 'NewOffersPage';

  mySelectedIndex: number;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController ) {
   
      this.mySelectedIndex = navParams.data.tabIndex || 0;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


}
