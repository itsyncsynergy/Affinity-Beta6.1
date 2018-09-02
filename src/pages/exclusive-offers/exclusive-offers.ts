import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from "../../services/customer.service";

/**
 * Generated class for the ExclusiveOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exclusive-offers',
  templateUrl: 'exclusive-offers.html',
})
export class ExclusiveOffersPage {
  params:any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];
    this.showLoading()
    this.customerService.getList('exclusive_offers_categories').subscribe(response => { 
      items = response;
      this.params.data = {
        "headerTitle": "Exclusive Offers",
        // "items": items
        "items": [
          {
            "id": 1,
            "category_id": 7,
            "cate_title": "Restaurant",
            "link": 'ProductCategoriesPage',
            "subtitle": "apartments",
            "image": "assets/images/background/offers/restaurant.jpg"
          },
          {
            "id": 2,
            "category_id": 14,
            "cate_title": "Fashion",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/fashion.jpg"
          },
          {
            "id": 3,
            "category_id": 12,
            "cate_title": "Hotels",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/hotels.jpg"
          },
          {
            "id": 4,
            "category_id": 10,
            "cate_title": "Entertainment",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/entertainment.jpg"
          },
          {
            "id": 5,
            "category_id": 8,
            "cate_title": "Bars & NightClubs",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/bars_nightclubs.jpeg"
          },
          {
            "id": 6,
            "category_id": 15,
            "cate_title": "Kids",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/kids.jpg"
          },
          {
            "id": 7,
            "category_id": 16,
            "cate_title": "Retail",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/retail.jpeg"
          },
          {
            "id": 8,
            "category_id": 13,
            "cate_title": "Services",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/services.jpeg"
          },
          {
            "id": 9,
            "category_id": 6,
            "cate_title": "Health & Wellness",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/health_wellness.jpeg"
          },
          {
            "id": 10,
            "category_id": 11,
            "cate_title": "Travel",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/offers/travel.jpg"
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
        navCtrl.push('ExclusiveOffersCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExclusiveOffersPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}
