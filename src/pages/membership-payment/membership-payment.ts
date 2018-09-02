import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the MembershipPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-payment',
  templateUrl: 'membership-payment.html',
})
export class MembershipPaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    
  }

  chargeCard() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipPaymentPage');
  }

}
