import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//import pages for the tabs
import { ExclusiveOffersPage } from "../exclusive-offers/exclusive-offers";
import { TravelsPage } from "../travels/travels";
import { RentalsPage } from "../rentals/rentals";
import { ProductsPage } from "../products/products";

/**
 * Generated class for the PrivilegesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privileges',
  templateUrl: 'privileges.html',
})
export class PrivilegesPage {

  // set the root pages for each tab
  tab1Root: string = 'ExclusiveOffersPage';
  tab2Root: string = 'TravelsPage';
  tab3Root: string = 'RentalsPage';
  tab4Root: string = 'ProductsPage';
  tab5Root: string = 'AvaPage';
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivilegesPage');
  }

}
