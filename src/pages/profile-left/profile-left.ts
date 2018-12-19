import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { IService } from '../../services/IService';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the ProfileLeftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-left',
  templateUrl: 'profile-left.html',
})

export class ProfileLeftPage {
  active: boolean;
  data: any;
  events: any;
  profile_segment: string
  base_url: any = "";
  loading: Loading;

  redemption: any;
  interest: any;
  activities: any;
  subscription: any;
  membership: any;
  customer_id: any;
  username: any;
  notif_count:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public customerService: CustomerService, public loadingCtrl: LoadingController) {
    this.profile_segment = 'interest';
    this.base_url = AppSettings.BASE_URL;
    this.customer_id = localStorage.getItem('customer_id');
    this.showLoading()
    this.customerService.getList('notifications/' + this.customer_id).subscribe(response => {
      var user_name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
      var avatar = localStorage.getItem('avatar');
      window.localStorage.setItem('notif_count', JSON.stringify(response['count']));
      // localStorage.getItem('avatar');
  
      this.redemption = JSON.parse(localStorage.getItem('redemption') || null);
      this.interest = JSON.parse(localStorage.getItem('interest') || null);
      this.activities = JSON.parse(localStorage.getItem('activities') || null);
      this.subscription = JSON.parse(localStorage.getItem('subscription') || null);
      this.notif_count = JSON.parse(localStorage.getItem('notif_count'));
      // this.membership = localStorage.getItem('membership');
      this.membership = this.subscription.membership;
      this.customer_id = localStorage.getItem('customer_id');
      this.username = localStorage.getItem('username');
  
      console.log(this.subscription.expiry_message)
      // window.localStorage.setItem('notif_count', JSON.stringify(response['count']));

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
          "notif": this.notif_count
        }
        this.loading.dismiss();
    })

    this.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
      },
    };
  }
  toggleInterestButton(value, action): void {
    //hide the clicked button
    //update interest list
    this.updateInterestList(value, action)
  }

  updateInterestList(value, action) {
    console.log(value + ' clicked with ' + action + ' action');
    this.navCtrl.push('InterestPage', {
      id: value
    })

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  ionViewDidEnter(){
    this.profile_segment = 'interest';
    this.base_url = AppSettings.BASE_URL;

    this.customerService.getList('notifications/' + this.customer_id).subscribe(response => {
      var user_name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    var avatar = localStorage.getItem('avatar');
    window.localStorage.setItem('notif_count', JSON.stringify(response['count']));
    // localStorage.getItem('avatar');

    this.redemption = JSON.parse(localStorage.getItem('redemption') || null);
    this.interest = JSON.parse(localStorage.getItem('interest') || null);
    this.activities = JSON.parse(localStorage.getItem('activities') || null);
    this.subscription = JSON.parse(localStorage.getItem('subscription') || null);
    this.notif_count = JSON.parse(localStorage.getItem('notif_count'));
    // this.membership = localStorage.getItem('membership');
    this.membership = this.subscription.membership;
    this.customer_id = localStorage.getItem('customer_id');
    this.username = localStorage.getItem('username');

    console.log(this.subscription.expiry_message)
      // window.localStorage.setItem('notif_count', JSON.stringify(response['count']));

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
          "notif": this.notif_count
        }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileLeftPage');
  }
  isClassActive() {
    return this.active;
  }


  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

  segmentChanged(event) {
    //change to the selected tab
    //document.getElementById(event).style.display = "none";
    console.log(event);
  }

  showInterest() {
    document.getElementById('interest').style.display = "";
    document.getElementById('redemption').style.display = "none";
    document.getElementById('activities').style.display = "none";
    document.getElementById('membership').style.display = "none";
  }

  showRedemption() {
    document.getElementById('interest').style.display = "none";
    document.getElementById('redemption').style.display = "";
    document.getElementById('activities').style.display = "none";
    document.getElementById('membership').style.display = "none";

  }

  showActivities() {
    document.getElementById('interest').style.display = "none";
    document.getElementById('redemption').style.display = "none";
    document.getElementById('activities').style.display = "";
    document.getElementById('membership').style.display = "none";

  }

  showMembership() {
    document.getElementById('interest').style.display = "none";
    document.getElementById('redemption').style.display = "none";
    document.getElementById('activities').style.display = "none";
    document.getElementById('membership').style.display = "";

  }

  appSettings() {
    //load the app settings page
  }

  edit() {
    this.navCtrl.push('ProfileEditPage');
  }

  GotoSub() {
    this.navCtrl.push('SubscriptionPage');
  }

  GotoRenew() {
    this.navCtrl.push('RenewPage', {
      customer_id: this.customer_id
    });
  }

  GotoChange() {
    this.navCtrl.push('ChangePlanPage');
  }

  GotoUpgrade(){
    this.navCtrl.push('UpgradePlanPage');
    
  }

  GotoCard(){
    this.navCtrl.push('MembershipCardPage', {
      customer_id: this.customer_id
    });
  }

  Gonotif(){
    this.customerService.getList('read_notification/' + this.customer_id).subscribe(response => {
      if (response['error'] == false) {
        this.navCtrl.push('AppNotifPage');
      } 
    })
    
  }
  

}
