import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the StylingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-styling',
  templateUrl: 'styling.html',
})
export class StylingPage {

  data: any = {};
  events: any = {};
  user_image_link: any;
  base_url:any =""

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "headerTitle": "Styling",
      "items": [
        {
          "id": 1,
          "title": "Personal & Wardrobe",
          "link": 'PersonalWardrobePage',
          "subtitle": "",
          "image": "assets/images/background/styling/personal_wardrobe_styling.jpg"
        },
        {
          "id": 2,
          "title": "Home & Office",
          "link": 'HomeStylingPage',
          "subtitle": "",
          "image": "assets/images/background/styling/home_office_styling.jpeg"
        },
        {
          "id": 3,
          "title": "Bridal Styling",
          "link": 'BridalStylingPage',
          "subtitle": "",
          "image": "assets/images/background/styling/bridal_styling.jpg"
        }
      ]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StylingPage');
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  pageClick(id){
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('PersonalWardrobePage')
      console.log('Got here' + id);
    } else if (id.id == 2) {
      this.navCtrl.push('HomeStylingPage')
      console.log('Got here' + id);
    } else if (id.id == 3) {
      this.navCtrl.push('BridalStylingPage')
      console.log('Got here' + id);
    } 
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

}
