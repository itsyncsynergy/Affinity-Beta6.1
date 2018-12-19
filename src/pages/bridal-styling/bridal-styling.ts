import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the BridalStylingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bridal-styling',
  templateUrl: 'bridal-styling.html',
})
export class BridalStylingPage {

  data: any;
  customer_id: string;
  api : string;
  user_image_link: any;
  base_url:any;

  public bridal : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Bridal Styling"
    }

    this.bridal = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      fullname: ["", Validators.required],
      service: ["", Validators.required],
      location: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required],
      venue: ["", Validators.required],
      address: ["", Validators.required],
      budget: ["", Validators.required]

    });

  }

  sendBridal(){

    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    loader.present();

    var url = this.api + 'styling/bridal_styling';
    this.data = this.http.post(url, this.bridal.value);
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
    console.log(this.bridal.value)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BridalStylingPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
