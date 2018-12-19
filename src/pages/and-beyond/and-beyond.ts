import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the AndBeyondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-and-beyond',
  templateUrl: 'and-beyond.html',
})
export class AndBeyondPage {

  data: any;
  customer_id: string;
  api : string;
  base_url:any =""
  user_image_link: any;
  public beyond : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Service Request"
    }

    this.beyond = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      details: ["", Validators.required]

    });


  }

  sendBeyond(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    loader.present();
    var url = this.api + 'and_beyond';
    this.data = this.http.post(url, this.beyond.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">Thank you for reaching out. Your request has been forwarded to a lifestyle manager and they will be in touch soon.</p>',
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
    console.log(this.beyond.value)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AndBeyondPage');
  }

  presentFilter() {

    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

 

}
