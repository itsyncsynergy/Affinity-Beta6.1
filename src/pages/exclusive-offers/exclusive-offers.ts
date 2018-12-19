import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { CustomerService } from "../../services/customer.service";
import { AppSettings } from '../../app/appSettings';

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
  data: any;
  user_image_link: any;
  base_url: any = ""
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public modalCtrl:ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    let items = [];
    this.showLoading()
    this.data = {
      "headerTitle": "Exclusive Offers",
      // "items": items
      "items": [
        {
          "id": 1,
          "category_id": 7,
          "cate_title": "Restaurants",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/restaurants.jpg"
        },
        {
          "id": 2,
          "category_id": 8,
          "cate_title": "Bars, Lounges & Nightclubs",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/bars_nightclubs.jpg"
        },
        {
          "id": 3,
          "category_id": 12,
          "cate_title": "Hotels",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/hotels.jpg"
        },
        {
          "id": 4,
          "category_id": 14,
          "cate_title": "Fashion",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/fashion.jpg"
        },
        {
          "id": 5,
          "category_id": 22,
          "cate_title": "Fitness",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/fitness.jpg"
        },
        {
          "id": 6,
          "category_id": 21,
          "cate_title": "Health",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/health.jpg"
        },
        {
          "id": 7,
          "category_id": 6,
          "cate_title": "Beauty",
          "link": "ExclusiveOffersCategoriesPage",
          "subtitle": "",
          "image": "assets/images/background/offers/beauty.jpg"
        },
        {
          "id": 8,
          "category_id": 19,
          "cate_title": "Auto Services",
          "link": "ExclusiveOffersCategoriesPage",
          "subtitle": "",
          "image": "assets/images/background/offers/autoservices.jpg"
        },
        {
          "id": 9,
          "category_id": 9,
          "cate_title": "Household Essentials",
          "link": "ExclusiveOffersCategoriesPage",
          "subtitle": "",
          "image": "assets/images/background/offers/household_essentials.jpg"
        },
        {
          "id": 10,
          "category_id": 10,
          "cate_title": "Entertainment",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/entertainment.jpg"
        },
        {
          "id": 11,
          "category_id": 20,
          "cate_title": "Arts",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/arts.jpg"
        },
        {
          "id": 12,
          "category_id": 15,
          "cate_title": "Kiddies",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/kids.jpg"
        },
        {
          "id": 13,
          "category_id": 16,
          "cate_title": "Retail",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/retail.jpg"
        },
        {
          "id": 14,
          "category_id": 13,
          "cate_title": "Services",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/services.jpeg"
        },
        {
          "id": 15,
          "category_id": 11,
          "cate_title": "Travel",
          "link": 'ExclusiveOffersCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/offers/travel.jpg"
        }

      ]
    }
    this.loading.dismiss();
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
    this.navCtrl.push('ExclusiveOffersCategoriesPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExclusiveOffersPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(1);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}
