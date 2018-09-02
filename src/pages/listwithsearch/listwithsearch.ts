import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListwithsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listwithsearch',
  templateUrl: 'listwithsearch.html',
})
export class ListwithsearchPage {

  params: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.params.data = {
      "headerTitle": "Simple",
      "items": [
        {
          "title": "Friends",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/1.jpg"
        },
        {
          "title": "Enemies",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/2.jpg"
        },
        {
          "title": "Neutral",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/3.jpg"
        },
        {
          "title": "Family",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/4.jpg"
        },
        {
          "title": "Guests",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/5.jpg"
        },
        {
          "title": "Students",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/6.jpg"
        },
        {
          "title": "Friends",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/7.jpg"
        },
        {
          "title": "Enemies",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/8.jpg"
        },
        {
          "title": "Neutral",
          "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "image": "assets/images/background/9.jpg"
        }
      ]
    }

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (item: any) {
        console.log("onTextChange");
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListwithsearchPage');
  }

}
