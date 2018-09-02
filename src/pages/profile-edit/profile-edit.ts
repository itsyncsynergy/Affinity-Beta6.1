import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  firstname: any;
  lastname:any;
  newpass: string;
  confirmpass: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController,public authservice: AuthService,public storage: Storage) {
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
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');

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
      "firstname": this.firstname,
      "lastname": this.lastname
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  editProfile(){
    console.log('got here');
    var url= 'http://192.168.8.100:8000/api/auth/edit_profile?key=value';
    let postData = new FormData();
    postData.append('key', 'value');
    postData.append('username', this.data.username);
    postData.append('firstname', this.data.firstname);
    postData.append('lastname', this.data.lastname);
    postData.append('newpass', this.newpass);
    postData.append('confirmpass', this.confirmpass);

    this.data = this.http.post(url, postData);
    this.data.subscribe(data => {
      if (data['code'] == 502){
       let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Password Do Not Match',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
          
        });
        alert.present();
        console.log(data);
        return;
        
      } 
      else if(data['code'] == 200){
        let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Your Profile has been Updated Successfully',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
          
        });
        alert.present();
        console.log(data);
        return;
      }
    });
  }

}
