import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Loading, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../app/appSettings';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { mobiscroll, MbscDatetimeOptions } from '@mobiscroll/angular';

/**
 * Generated class for the ApartmentRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

mobiscroll.settings = {
  theme: 'material',
  lang: 'en'
};

@IonicPage()
@Component({
  selector: 'page-apartment-request',
  templateUrl: 'apartment-request.html',
})
export class ApartmentRequestPage {
  data: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  api : string;
  customer_id:any;
  locale: string;

    compact: String;
    expanded: Date;

    compSettings: MbscDatetimeOptions = {
    dateWheels: '|D M d|',
    returnFormat: 'locale'

  };

  public apartment : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage) {

    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');
    console.log(navParams.data.id);
    console.log(navParams.data.category_id);

    this.data = {

      "headerTitle": "Apartment Booking",
      "customer_id": localStorage.getItem('customer_id'),
      "category_id": navParams.data.category_id,
      "rental_id": navParams.data.id
 
    }

    this.apartment = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      category_id: [navParams.data.category_id, Validators.required],
      rental_id: [navParams.data.id, Validators.required],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
      no_of_guests: ['', Validators.required],
      see_more: ['', Validators.required],
      additional: ['', Validators.required]

    });
  }

  SendRequest(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    loader.present();
    var url = this.api + 'rental_request/store';

    this.data = this.http.post(url, this.apartment.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">Thank you for your interest in renting ' + this.navParams.data.name+ '. We’ll confirm availability and get back to you shortly.</p>',
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

    console.log(this.apartment.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApartmentRequestPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
