import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../app/appSettings';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the VipAccessRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vip-access-request',
  templateUrl: 'vip-access-request.html',
})
export class VipAccessRequestPage {
  data: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  api : string;
  customer_id:any;

  public request : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage) {
    
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');
    console.log('Gor hia');
    console.log(navParams.data.id);
    console.log('Gor hia');
    console.log(navParams.data.category_id);

    this.data = {
      "headerTitle": "Request Quote",
      "customer_id": localStorage.getItem('customer_id'),
      "fullname": localStorage.getItem('firstname') + " " + localStorage.getItem('lastname'),
      'email': localStorage.getItem('username'),
      "phone": localStorage.getItem('phone'),
      "category_id": navParams.data.category_id,
      "private_party_id": navParams.data.id
 
    }

    this.request = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      category_id: [navParams.data.category_id, Validators.required],
      party_id: [navParams.data.id, Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      party_size: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      others: ['']

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VipAccessRequestPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  SendRequest(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    var url = this.api + 'access/request';
    this.data = this.http.post(url, this.request.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">Thank you for requesting for our '+ this.navParams.data.title + 'feature.  Your request has been forwarded to the appropriate quarters and you’ll be contacted (via email) shortly. </p>',
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
    console.log(this.request.value)

  }

}
