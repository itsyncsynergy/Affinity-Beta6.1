import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FlightBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-flight-booking',
  templateUrl: 'flight-booking.html',
  
})
export class FlightBookingPage {
  data: any;
  request_type: string;
  cabin: string;
  num_pass: string;
  ex_date: string;
  ex_time: string;
  info: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public authservice: AuthService,public storage: Storage,public http: HttpClient, private alertCtrl: AlertController) {
    
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Flight Booking"
    }
  }

  submit(){
    
    var url= 'http://192.168.8.100:8000/api/flight_booking?key=value';
    let postData = new FormData();
    postData.append('key', 'value');
    postData.append('customer_id', this.data.customer_id);
    postData.append('request_type', this.request_type);
    postData.append('cabin', this.cabin);
    postData.append('num_pass', this.num_pass);
    postData.append('ex_date', this.ex_date);
    postData.append('ex_time', this.ex_time);
    postData.append('info', this.info);

    this.data = this.http.post(url, postData);
    this.data.subscribe(data => {
      if (data['error'] == false){
       let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Booking Sent!!!',
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

    console.log('ionViewDidLoad FlightBookingPage');
   
  }


}
