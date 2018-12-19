import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController   } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the TravelPackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-travel-packages',
  templateUrl: 'travel-packages.html',
})
export class TravelPackagesPage {

  data: any;
  customer_id: string;
  api : string;
  user_image_link: any;
  public bespoke : FormGroup;
  base_url:any;
  membership:any;
  value:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Bespoke Travels"
    }

    this.bespoke = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      occassion: ['', Validators.required],
      duration: ['', Validators.required],
      group_size: ['', Validators.required],
      travel_date: ['', Validators.required],
      travel_time: ['', Validators.required],
      destination: [""]
     
    });
  }
  onChange(membership){
    if (this.membership == '1') {
      this.value = 1;
    } else if (this.membership == '2'){
      this.value = 0; 
    }
  }

  sendBespoke(){

    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
  });
  loader.present();

    var url = this.api + 'bespoke_travel';
    this.data = this.http.post(url, this.bespoke.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          
          message: '<img src="assets/images/smileys/smile.png" class="emoji-align" /><p class="emoji-text">Dear '+ localStorage.getItem('firstname') + 'We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
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
    console.log(this.bespoke.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPackagesPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}
