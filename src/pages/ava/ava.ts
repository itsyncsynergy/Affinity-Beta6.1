import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the AvaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ava',
  templateUrl: 'ava.html',
})
export class AvaPage {

  data: any = {};
  user_image_link: any;
  customer_id: string;
  base_url: any =""
  api : string;

  public ava : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.data = {
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "AVA",
      "fullname": localStorage.getItem('firstname')+ " " + localStorage.getItem('lastname')
    }

    this.ava = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      phone: ['', Validators.required],
      contact_means: ['', Validators.required],
      desc: ['', Validators.required],
     
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaPage');
  }

  sendRequest(){

    var url = this.api + 'vpa/send_request';
    this.data = this.http.post(url, this.ava.value);
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
          
          message: '<img src="assets/images/smileys/smile.png" class="emoji-align" /><p class="emoji-text">We are thrilled to hear from you. Your request has been forwarded to a member of AVA’s team and they will get back to you shortly.</p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              console.log('button pressed')
            }
          }] 
        });
        alert.present();
        console.log(data);
        return; 
      }
    });
    console.log(this.ava.value)
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  swipe(event) {
    //right to left
    if(event.direction == 2) {
      this.navCtrl.parent.select(4);
    }
    //left to right
    if(event.direction == 4) { 
      this.navCtrl.parent.select(2);
    }
  }

}
