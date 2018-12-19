import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {AppSettings } from '../../app/appSettings';

/**
 * Generated class for the BeyondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beyond',
  templateUrl: 'beyond.html',
})
export class BeyondPage {

  data: any = {};
  events: any = {};
  user_image_link: any;
  base_url:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.data = {
      "headerTitle": "And Beyond",
      "items": [
        {
          "id": 1,
          "title": "Service Request",
          "link": 'AndBeyondPage',
          "subtitle": "",
          "image": "assets/images/background/vip_access/service_request_form.jpg"
        }
      ]
    }
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeyondPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  pageClick(id){
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('AndBeyondPage')
      console.log('Got here' + id);
    } 
  }

  swipe(event) {
    if(event.direction === 4) {
      this.navCtrl.parent.select(2);
    }
  }

}
