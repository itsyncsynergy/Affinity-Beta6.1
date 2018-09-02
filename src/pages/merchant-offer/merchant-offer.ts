import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the MerchantOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchant-offer',
  templateUrl: 'merchant-offer.html',
})
export class MerchantOfferPage {
  data: any;
  events: any;
  params: any = {};
  @ViewChild(Content)
  content: Content;

  active: boolean;
  headerImage: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      "contentDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus semper elit platea; Velit aptent euismod pede euismod facilisis? In ultrices venenatis mauris. Consequat gravida pretium ligula lectus; Lacus natoque elit elit: Imperdiet cursus fermentum suspendisse; Cum iaculis venenatis!",
      "contentTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
      "email": "dev@csform.com",
      "headerTitle": "GMAPS + Location  Details",
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
      "location": "Design street, New York, USA",
      "map": {
        "lat": 40.712562,
        "lng": -74.005911,
        "mapTypeControl": true,
        "streetViewControl": true,
        "zoom": 15
      },
      "phone": "33 222 11",
      "reviews": "4.12 (78 reviews)",
      "time": "8:00 to 16:00 working days",
      "title": "Museum of Modern Art",
      "webSite": "www.csform.com"
    }
    this.params.events = {
      'onRates': function (index: number) {
        console.log("Rates " + (index + 1));
      }
    };
    this.data = {
      "avatar": "assets/images/avatar/3.jpg",
      "category": "ENGINEERING",
      "headerImage": "assets/images/background-small/3.jpg",
      "headerTitle": "News",
      "items": [{
        "id": 1,
        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }],
      "shareIcon": "more",
      "subtitle": "by Name Surname",
      "title": "Infinit bridge made in China. Locals said that is not possible to see end of bridge. 7 people lost during walk."
    }
    this.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
      },
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchantOfferPage');
  }

  onEvent(event: string, item: any, e: any) {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  ngOnChanges(changes: { [propKey: string]: any }) {
    if (changes.data && changes.data.currentValue) {
      this.headerImage = changes.data.currentValue.headerImage;
    }
    this.subscribeToIonScroll();
  }

  ngAfterViewInit() {
    this.subscribeToIonScroll();
  }

  isClassActive() {
    return this.active;
  }

  subscribeToIonScroll() {
    if (this.content != null && this.content.ionScroll != null) {
      this.content.ionScroll.subscribe((d) => {
        if (d.scrollTop < 240) {
          this.active = false;
          return;
        }
        this.active = true;
      });
    }
  }

}
