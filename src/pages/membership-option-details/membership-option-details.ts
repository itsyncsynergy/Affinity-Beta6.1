import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MembershipOptionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-option-details',
  templateUrl: 'membership-option-details.html',
})
export class MembershipOptionDetailsPage {
  data: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.data = {

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipOptionDetailsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
