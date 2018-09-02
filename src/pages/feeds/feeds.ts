import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  params: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      'toolbarTitle': 'Feeds'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

}
