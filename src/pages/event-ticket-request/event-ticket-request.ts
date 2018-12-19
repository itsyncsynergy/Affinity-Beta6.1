import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../app/appSettings';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the EventTicketRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-ticket-request',
  templateUrl: 'event-ticket-request.html',
})
export class EventTicketRequestPage {
  data: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  api : string;
  customer_id:any;

  public booking : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage) {

    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');

    console.log('Gor hia');
    console.log(navParams.data.id);
    console.log('Gor hia');
    console.log(navParams.data.category_id);
    console.log(navParams.data.price);

    this.data = {
      "headerTitle": "Ticket Booking",
      "customer_id": localStorage.getItem('customer_id'),
      "fullname": localStorage.getItem('firstname') + " " + localStorage.getItem('lastname'),
      'email': localStorage.getItem('username'),
      "phone": localStorage.getItem('phone'),
      "category_id": navParams.data.category_id,
      "vip_event_id": navParams.data.id
 
    }

    this.booking = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      category_id: [navParams.data.category_id, Validators.required],
      event_id: [navParams.data.id, Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      quantity: ['', Validators.required]

    });
  }

  SendRequest(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    loader.present();
    var url = this.api + 'tickets/buy';

    this.data = this.http.post(url, this.booking.value);
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventTicketRequestPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
