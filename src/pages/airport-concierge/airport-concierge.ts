import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AirportConciergePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-airport-concierge',
  templateUrl: 'airport-concierge.html',
})
export class AirportConciergePage {
   data: any;
   customer_id: string;
   dep_from: string;
   depar_suite: string;
   depar_pass: string;
   expected_date: string;
   expected_time: string;
   depar_porters: string;
   depar_lounge: string;
   depar_push_chairs: string;
   depar_vallet: string;
   depar_vat_reclaim: string;
   depar_chaffeur: string;
   depar_gifts: string;
   depar_others: string;

   arrival_to: string;
   arrival_suite: string;
   arrival_pass:string;
   arrival_date:string;
   arrival_time:string;
   arrival_porters:string;
   arrival_lounge:string;
   arrival_push_chairs:string;
   arrival_vallet:string;
   arrival_vat_reclaim:string;
   arrival_chaffeur:string;
   arrival_gifts:string;
   arrival_others:string;

   dep_from_1: string;
   arrival_to_1: string;
   round_suite_1: string;
   round_passengers_1: string;
   round_expected_date_1: string;
   round_expected_time_1: string;
   dep_from_2: string;
   arrival_to_2: string;
   round_suite_2: string;
   round_passengers_2: string;
   round_expected_date_2: string;
   round_expected_time_2: string;
   round_porters: string;
   round_lounge: string;
   round_push_chairs: string;
   round_vallet: string;
   round_vat_reclaim: string;
   round_chaffeur: string;
   round_gifts: string;
   round_others: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authservice: AuthService,public storage: Storage,public http: HttpClient, private alertCtrl: AlertController) {
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirportConciergePage');
  }

  sendDeparture(){
    var url= 'http://192.168.8.100:8000/api/departure_request?key=value';
    let postData = new FormData();
    postData.append('key', 'value');
    postData.append('customer_id', this.data.customer_id);
    postData.append('dep_from', this.dep_from);
    postData.append('depar_suite', this.depar_suite);
    postData.append('depar_pass', this.depar_pass);
    postData.append('expected_date', this.expected_date);
    postData.append('expected_time', this.expected_time);
    postData.append('depar_porters', this.depar_porters);
    postData.append('depar_lounge', this.depar_lounge);
    postData.append('depar_push_chairs', this.depar_push_chairs);
    postData.append('depar_vallet', this.depar_vallet);
    postData.append('depar_vat_reclaim', this.depar_vat_reclaim);
    postData.append('depar_chaffeur', this.depar_chaffeur);
    postData.append('depar_gifts', this.depar_gifts);
    postData.append('depar_others', this.depar_others);

    this.data = this.http.post(url, postData);
    this.data.subscribe(data => {
      if (data['error'] == false){
       let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Departure Booking Sent!!!',
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

  sendArrival(){

    var url= 'http://192.168.8.100:8000/api/arrival?key=value';
    let postData = new FormData();
    postData.append('key', 'value');
    postData.append('customer_id', this.data.customer_id);
    postData.append('arrival_to', this.arrival_to);
    postData.append('arrival_suite', this.arrival_suite);
    postData.append('arrival_pass', this.arrival_pass);
    postData.append('arrival_date', this.arrival_date);
    postData.append('arrival_time', this.arrival_time);
    postData.append('arrival_porters', this.arrival_porters);
    postData.append('arrival_lounge', this.arrival_lounge);
    postData.append('arrival_push_chairs', this.arrival_push_chairs);
    postData.append('arrival_vallet', this.arrival_vallet);
    postData.append('arrival_vat_reclaim', this.arrival_vat_reclaim);
    postData.append('arrival_chaffeur', this.arrival_chaffeur);
    postData.append('arrival_gifts', this.arrival_gifts);
    postData.append('arrival_others', this.arrival_others);

    this.data = this.http.post(url, postData);
    this.data.subscribe(data => {
      if (data['error'] == false){
       let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Arrival Booking Sent!!!',
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

  sendRoundTrip(){
    var url= 'http://192.168.8.100:8000/api/roundtrip?key=value';
    let postData = new FormData();

    postData.append('key', 'value');
    postData.append('customer_id', this.data.customer_id);
    postData.append('dep_from_1', this.dep_from_1);
    postData.append('arrival_to_1', this.arrival_to_1);
    postData.append('round_suite_1', this.round_suite_1);
    postData.append('round_passengers_1', this.round_passengers_1);
    postData.append('round_expected_date_1', this.round_expected_date_1);
    postData.append('round_expected_time_1', this.round_expected_time_1);
    postData.append('dep_from_2', this.dep_from_2);
    postData.append('arrival_to_2', this.arrival_to_2);
    postData.append('round_suite_2', this.round_suite_2);
    postData.append('round_passengers_2', this.round_passengers_2);
    postData.append('round_expected_date_2', this.round_expected_date_2);
    postData.append('round_expected_time_2', this.round_expected_time_2);
    postData.append('round_porters', this.round_porters);
    postData.append('round_lounge', this.round_lounge);
    postData.append('round_push_chairs', this.round_push_chairs);
    postData.append('round_vallet', this.round_vallet);
    postData.append('round_vat_reclaim', this.round_vat_reclaim);
    postData.append('round_chaffeur', this.round_chaffeur);
    postData.append('round_gifts', this.round_gifts);
    postData.append('round_others', this.round_others);
    
    this.data = this.http.post(url, postData);
    this.data.subscribe(data => {
      if (data['error'] == false){
       let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Round Trip Booking Sent!!!',
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
