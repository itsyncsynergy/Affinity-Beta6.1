import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the AirlinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-airlines',
  templateUrl: 'airlines.html',
})
export class AirlinesPage {

  data: any = {};
  events: any = {};
  base_url: any = ""
  user_image_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "headerTitle": "Flight Bookings",
      "items": [
        {
          "id": 1,
          "title": "Virgin Atlantic",
          "link": 'FlightBookingPage',
          "subtitle": "",
          "image": "assets/images/background/airlines/virgin_atlantic.jpg"
        },{
          "id": 2,
          "title": "More Airlines",
          "link": 'GenericBookingPage',
          "subtitle": "",
          "image": "assets/images/background/airlines/generic.jpg"
        }
      ]
    }

    this.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (item: any) {
        console.log("onTextChange");
      }
    }
  }
  // pageClick(category_id) {
  //   console.log(category_id.id);
  //   this.navCtrl.push(category_id.link, {
  //     id: category_id.id,
  //     headerTitle: '',
  //   })
  // }

  pageClick(id) {
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('FlightBookingPage')
      console.log('Got here Flight Booking');
    } else if (id.id == 2) {
      this.navCtrl.push('GenericBookingPage')
      console.log('Got here Generic Booking');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirlinesPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}