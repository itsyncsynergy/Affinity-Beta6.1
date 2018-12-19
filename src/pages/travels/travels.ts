import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
/**
 * Generated class for the TravelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-travels',
  templateUrl: 'travels.html',
})
export class TravelsPage {
  base_url:any = ""
  data: any = {};
  events: any = {};
  user_image_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "headerTitle": "Travels",
      "items": [
        {
          "id": 1,
          "title": "Flight Bookings",
          "link": 'FlightBookingPage',
          "subtitle": "",
          "image": "assets/images/background/travel/flight_bookings.jpg"
        },
        {
          "id": 2,
          "title": "Airport Concierge",
          "link": 'AirportConciergePage',
          "subtitle": "",
          "image": "assets/images/background/travel/airport_concierge.jpg"
        },
        {
          "id": 3,
          "title": "Luxury Packages",
          "link": 'LuxuryPackagesPage',
          "subtitle": "",
          "image": "assets/images/background/travel/luxury_packages.jpg"
        },
        {
          "id": 4,
          "title": "Bespoke Travel",
          "link": 'TravelPackagesPage',
          "subtitle": "",
          "image": "assets/images/background/travel/bespoke.jpg"
        },{
          "id": 5,
          "title": "Travel Concierge",
          "link": "TravelConciergePage",
          "subtitle": "",
          "image": "assets/images/background/travel/travel_concierge.jpg"
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

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  pageClick(id){
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('AirlinesPage')
      console.log('Got here Flight Booking');
    } else if (id.id == 2) {
      this.navCtrl.push('AirportConciergePage')
      console.log('Got here to Airport Concierge');
    } else if (id.id == 3) {
      this.navCtrl.push('LuxuryPackagesPage')
      console.log('Got here to Luxury Package');
    } else if (id.id == 4) {
      this.navCtrl.push('TravelPackagesPage')
      console.log('Got here to Travel Packages');
    } else if(id.id == 5) {
      this.navCtrl.push('TravelConciergePage')
      console.log('Got here to Travel Concierge');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelsPage');
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(0);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}
