import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController  } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { mobiscroll, MbscRangeOptions } from '@mobiscroll/angular';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the HomeStylingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
mobiscroll.settings = {
  theme: 'ios-dark',
  lang: 'en'
};

let now = new Date(),
    week = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59)];


@IonicPage()
@Component({
  selector: 'page-home-styling',
  templateUrl: 'home-styling.html',
})
export class HomeStylingPage {
  data: any;
  customer_id: string;
  api : string;
  user_image_link: any;
  base_url:any;
  locale: string;
  public homes : FormGroup;

  range: String ;
    date: Array < String > ;
    rangeCenter: Array < Date > ;
    nonForm: Array < Date > ;
    external: Array < Date > = week;

    rangeCenterSettings: any = {
      display: 'center',
      theme: 'ios-dark',
      returnFormat: 'locale'
    };

    dateSettings: MbscRangeOptions = {
        startInput: '#startDate',
        endInput: '#endDate',
        controls: ['date']
    };

    externalSettings: MbscRangeOptions = {
        showOnTap: false,
        showOnFocus: false
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Home Styling"
    }

    this.homes = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      project_type: ["", Validators.required],
      service: ["", Validators.required],
      other:[""],
      location: ["", Validators.required],
      list_of_rooms: ["", Validators.required],
      general_scope: ["", Validators.required],
      inv_level: ["", Validators.required],
      expectations: ["", Validators.required],
      date: ["", Validators.required],
      preffered_style: ["", Validators.required],
      budget: ["", Validators.required]

    });

  }

  sendHome(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    loader.present();

    var url = this.api + 'styling/home_styling';
    this.data = this.http.post(url, this.homes.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">We are thrilled to hear from you. Your request has been forwarded to a member of our styling team and they’ll be in touch soon.</p>',
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
    console.log(this.homes.value)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStylingPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
