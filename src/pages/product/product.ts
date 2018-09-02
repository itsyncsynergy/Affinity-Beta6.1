import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  params: any = {};
  //events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      "avatar": "assets/images/avatar/3.jpg",
      "category": "ENGINEERING",
      "headerImage": "assets/images/background-small/3.jpg",
      "headerTitle": "News",
      "items": [{
        "id": 1,
        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }, {
        "id": 2,
        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "title": "Lorem ipsum dolor sit amet"
      }, {
        "id": 3,
        "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      }, {
        "id": 4,
        "subtitle": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      }],
      "shareIcon": "more",
      "subtitle": "by Name Surname",
      "title": "Infinit bridge made in China. Locals said that is not possible to see end of bridge. 7 people lost during walk."
    }

    this.params.events = {
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
    console.log('ionViewDidLoad ProductPage');
  }

}
