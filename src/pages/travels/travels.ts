import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  data: any = {};
  events: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
          "title": "Travel Concierge",
          "link": 'TravelPackagesPage',
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
  // pageClick(category_id) {
  //   console.log(category_id.id);
  //   this.navCtrl.push(category_id.link, {
  //     id: category_id.id,
  //     headerTitle: '',
  //   })
  // }

  pageClick(id){
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('FlightBookingPage')
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
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelsPage');
  }

}
