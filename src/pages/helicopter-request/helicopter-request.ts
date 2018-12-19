import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelicopterRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helicopter-request',
  templateUrl: 'helicopter-request.html',
})
export class HelicopterRequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Gor hia');
    console.log(navParams.data.id);
    console.log('Gor hia');
    console.log(navParams.data.category_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelicopterRequestPage');
  }

}
