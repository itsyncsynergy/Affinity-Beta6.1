import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, Modal } from 'ionic-angular';
import { CustomerService } from "../../services/customer.service";

import { RentalCategoriesPage } from "../rental-categories/rental-categories";

import { AppSettings } from "../../app/appSettings";

/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {

  params: any = {};
  loading: Loading;
  user_image_link:any;
  base_url:any = ""
  data: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public modalCtrl:ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    let items = [];
   
    // items = response;
    this.data = {
      "headerTitle": "Rentals",
      // "items": items
      "items": [
        {
          "id": 1,
          "category_id": 1,
          "cate_title": "Apartments and Villas",
          "link": 'RentalCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/rental/apartments_villas.jpg"
        },
        {
          "id": 2,
          "category_id": 2,
          "cate_title": "Cars and Chauffeurs",
          "link": 'RentalCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/rental/cars_chauffeurs.jpg"
        },
        {
          "id": 3,
          "category_id": 3,
          "cate_title": "Private Jets & Helicopters",
          "link": 'RentalCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/rental/private_jets_helicopters.jpg"
        },
        {
          "id": 4,
          "category_id": 4,
          "cate_title": "Boats and Yachts",
          "link": 'RentalCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/rental/boats_yachts.jpg"
        }
      ]
    } 



    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      
    }
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  onItemClick(category_id) {
    console.log(category_id);
    this.navCtrl.push('RentalCategoriesPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(1);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
  }

}
