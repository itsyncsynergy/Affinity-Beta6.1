import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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

  data: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {

    let items = [];
    this.showLoading()
    this.customerService.getList('rentals_categories').subscribe(response => {
      items = response;
      this.params.data = {
        "headerTitle": "Rentals",
        // "items": items
        "items": [
          {
            "id": 1,
            "category_id": 1,
            "cate_title": "Apartments Villa & Beach Houses",
            "link": 'RentalCategoriesPage',
            "subtitle": "apartments",
            "image": "assets/images/background/rental/apartments_villas.jpg"
          },
          {
            "id": 2,
            "category_id": 2,
            "cate_title": "Exotic Cars & Chauffeur",
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
            "cate_title": "Boats & Yacht",
            "link": 'RentalCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/rental/boats_yachts.jpg"
          }
        ]
      } 
      //this.loading.dismiss();
    })



    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('RentalCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalsPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}
