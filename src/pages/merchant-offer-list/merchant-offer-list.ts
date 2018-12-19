import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { MerchantService } from '../../services/merchant.service';
import { AppSettings } from '../../app/appSettings';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

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
  gallery: any;
  offers: any;
  base_url: any = ""
  user_image_link: any;

  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public merchantService: MerchantService, public launchNavigator: LaunchNavigator, public loadingCtrl: LoadingController, private inAppBrowser: InAppBrowser) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.showLoading()
    this.merchantService.getMerchantDetails(navParams.data.id).subscribe(response => {
      
      this.merchant = response['merchant_details'];
      this.reviews = response['reviews'];
      this.gallery = response['gallery'];
      this.offers = response['offers'];

      console.log(this.merchant.email)
      
      this.data = {
        "contentDescription": this.merchant.bio,
        "email": this.merchant.email,
        "headerTitle": this.merchant.name,
        "details": this.merchant.details,
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
          "zoom": 18
        },
        "phone": this.merchant.contact,
        "reviews": ""+ (this.merchant.rating/20) +" (" + this.reviews +" reviews)",
        "time": this.merchant.ntk,
        "title": this.merchant.name,
        "webSite": this.merchant.website,
        "id": this.merchant.merchant_id,
        'city': this.merchant.city,
        'state': this.merchant.state,
        'country': this.merchant.country,
        "avatar": this.merchant.avatar,
        "headerImage": this.merchant.headerImage,
        //"gallery": this.gallery,
        "gimage": response['gimage'],
        "items": this.offers,
      }
      // this.loading.dismiss();
      this.params.events = {
        'onRates': function (index: number) {
          console.log("Rates " + (index + 1));
        }
      };
      
      
      this.data.gallery = {
        "items": [
          {
            "id": 1,
            "title": this.merchant.name,
            "subtitle": "View Gallery",
            "image": response['gimage'],
            "items": this.gallery
          }
        ]
      };

      this.data.gallery.subGallery = "ItemDetailsPageSubImageGallery";
      this.data.gallery.fullscreen = "ItemDetailsPageFullScreenGallery";

      this.loading.dismiss();
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

  redeemOffer() {
    this.navCtrl.push('MerchantRedeemPage', {
      title: this.merchant.name,
      avatar: this.merchant.avatar,
      headerImage: this.merchant.headerImage,
      headerTitle: this.merchant.name,
      id: this.navParams.data.id

    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
     
    });
    this.loading.present();
  }

  openSubGallery = (group: any, index: number): any => {
    this.navCtrl.push(group.subGallery, {
      'group': group.items[index],
      'events': this.events,
      'layout': 1
    });
  }

  callWithNumber(mobileNumber) {
    window.open("tel:" + mobileNumber);
  }


  openMap(lat, long) {

    var app = this.launchNavigator.APP.USER_SELECT;

    this.launchNavigator.navigate([lat, long], {
      app: app
    })
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  openWebsite(website) {
    const browser = this.inAppBrowser.create(website, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=Close');
    
    browser.on('exit').subscribe(() => {
      console.log('Exit button pressed')
    })
    // window.open(website, '_system');
  }

  redeemOfferMerchant(id) {
    this.navCtrl.push('RedeemMerchantOffersPage', {
      id: id,
      nav: true
    })
  }

}
