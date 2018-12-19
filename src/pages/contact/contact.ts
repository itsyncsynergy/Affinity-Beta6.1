import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  data: any = {};
  user_image_link: any;
  base_url:any;
  customer_id: string;
  api : string;

  public contact : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.data = {
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Contact Us",
      "fullname": localStorage.getItem('firstname')+ " " + localStorage.getItem('lastname')
    }

    this.contact = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      firstname: [localStorage.getItem('firstname')],
      email: [localStorage.getItem('username')],
      title: ['', Validators.required],
      message: ['', Validators.required],

    });

  }

  sendRequest(){

    var url = this.api + 'contact';
    this.data = this.http.post(url, this.contact.value);
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    loader.present();
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
        let alert = this.alertCtrl.create({
          
          message: '<img src="assets/images/smileys/smile.png" class="emoji-align" /><p class="emoji-text">Thanks for filling out our contact form. Your message is important to us and we will be in touch within 48 hours. </p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot('FeedsPage');
            }
          }] 
        });
        alert.present();
        console.log(data);
        return; 
      }
    });
    console.log(this.contact.value)
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
