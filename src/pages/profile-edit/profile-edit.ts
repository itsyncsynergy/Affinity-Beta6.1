import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  active: boolean;
  data: any;
  events: any;
  profile_segment: string
  base_url: any = "";

  redemption: any;
  interest: any;
  activities: any;
  subscription: any;
  membership: any;
  customer_id: any;
  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile_segment = 'interest';
    this.base_url = AppSettings.BASE_URL;
    var user_name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    var avatar = localStorage.getItem('avatar');

    this.redemption = JSON.parse(localStorage.getItem('redemption') || null);
    this.interest = JSON.parse(localStorage.getItem('interest') || null);
    this.activities = JSON.parse(localStorage.getItem('activities') || null);
    this.subscription = JSON.parse(localStorage.getItem('subscription') || null);
    this.membership = localStorage.getItem('membership');
    this.customer_id = localStorage.getItem('customer_id');
    this.username = localStorage.getItem('username');

    console.log(this.subscription.expiry_message)

    this.data = {
      "avatar": avatar,
      "headerImage": "assets/images/background/1.jpg",
      "headerTitle": "Profile",
      "redemptions": this.redemption,
      "activities": this.activities,
      "subscription": this.subscription,
      "membership": this.membership,
      "interests": this.interest,
      "title": user_name,
      "customer_id": this.customer_id,
      "username": this.username,
      "name": "Full Name"
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

}
