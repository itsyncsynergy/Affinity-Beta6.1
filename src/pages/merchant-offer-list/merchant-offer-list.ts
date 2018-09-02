import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { MerchantService } from '../../services/merchant.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the MerchantOfferListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchant-offer-list',
  templateUrl: 'merchant-offer-list.html',
})
export class MerchantOfferListPage {
  data: any;
  events: any;
  loading: Loading;
  merchant: any;
  reviews: any;
  base_url: any = ""
  user_image_link: any;

  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public merchantService: MerchantService) {
    this.base_url = AppSettings.BASE_URL;
    this.merchantService.getMerchantDetails(navParams.data.id).subscribe(response => {
      this.user_image_link = localStorage.getItem('base_url') + localStorage.getItem('avatar');
      this.merchant = response['merchant_details']
      this.reviews = response['reviews']

      console.log(this.merchant.email)
      
      this.params.data = {
        "contentDescription": this.merchant.bio,
        "email": this.merchant.email,
        "headerTitle": this.merchant.name,
        "icon": "checkmark-circle",
        "iconsStars": [{
          "iconActive": "icon-star",
          "iconInactive": "icon-star-outline",
          "isActive": true
        }, {
          "iconActive": "icon-star",
          "iconInactive": "icon-star-outline",
          "isActive": true
        }, {
          "iconActive": "icon-star",
          "iconInactive": "icon-star-outline",
          "isActive": true
        }, {
          "iconActive": "icon-star",
          "iconInactive": "icon-star-outline",
          "isActive": true
        }, {
          "iconActive": "icon-star",
          "iconInactive": "icon-star-outline",
          "isActive": false
        }],
        "location": this.merchant.address,
        "map": {
          "lat": this.merchant.latitude,
          "lng": this.merchant.longitude,
          "mapTypeControl": true,
          "streetViewControl": true,
          "zoom": 15
        },
        "phone": this.merchant.contact,
        "reviews": ""+ (this.merchant.rating/20) +" (" + this.reviews +" reviews)",
        "time": this.merchant.ntk,
        "title": this.merchant.name,
        "webSite": this.merchant.website,
        "id": this.merchant.merchant_id
      }
      this.params.events = {
        'onRates': function (index: number) {
          console.log("Rates " + (index + 1));
        }
      };
      console.log(this.merchant.headerImage)
      this.data = {
        "avatar": this.merchant.avatar,
        "headerImage": this.merchant.headerImage,
        "headerTitle": this.merchant.name,
        "subtitle": this.merchant.details,
        "title": this.merchant.name,
        "items": [{
          "button": "READ",
          "id": 1,
          "image": "assets/images/avatar/0.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Grant Marshall"
        }, {
          "button": "READ",
          "id": 2,
          "image": "assets/images/avatar/1.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Pena Valdez"
        }, {
          "button": "READ",
          "id": 3,
          "image": "assets/images/avatar/2.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Jessica Miles"
        }, {
          "button": "READ",
          "id": 4,
          "image": "assets/images/avatar/3.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Jessica Miles"
        }, {
          "button": "READ",
          "id": 5,
          "image": "assets/images/avatar/4.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Lerri Barber"
        }, {
          "button": "READ",
          "id": 6,
          "image": "assets/images/avatar/5.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Natasha Gamble"
        }, {
          "button": "READ",
          "id": 7,
          "image": "assets/images/avatar/6.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "White Castaneda"
        }, {
          "button": "READ",
          "id": 8,
          "image": "assets/images/avatar/7.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Vanessa Ryan"
        }, {
          "button": "READ",
          "id": 9,
          "image": "assets/images/avatar/1.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Meredith Hendricks"
        }, {
          "button": "READ",
          "id": 10,
          "image": "assets/images/avatar/2.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Carol Kelly"
        }, {
          "button": "READ",
          "id": 11,
          "image": "assets/images/avatar/0.jpg",
          "imageAlt": "avatar",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Barrera Ramsey"
        }, {
          "button": "READ",
          "id": 12,
          "image": "assets/images/avatar/3.jpg",
          "imageAlt": "Presque Isle Harbor",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "title": "Holman Valencia"
        }],
      }
      //this.loading.dismiss();
    })

    

    this.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
        navCtrl.push('MerchantOfferPage')
      },
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchantOfferListPage');
  }

}
