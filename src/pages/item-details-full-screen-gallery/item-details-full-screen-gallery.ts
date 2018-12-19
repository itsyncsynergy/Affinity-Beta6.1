import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { IService } from '../../services/IService';

@IonicPage()
@Component({
  templateUrl: 'item-details-full-screen-gallery.html'
})
export class ItemDetailsPageFullScreenGallery {

  page: any;
  service: IService;
  params: any = {};
  user_image_link: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController) {
    this.user_image_link = localStorage.getItem('base_url') + localStorage.getItem('avatar');
    let index = navParams.get('index');
    this.params = { data: {} };
    if (navParams.get('group')) {
      this.params.data.items = navParams.get('group');
      this.params.data.fullscreen = "FullScreenGallery";
      this.params.data.index = index;
    } else {
      navCtrl.setRoot("HomePage");
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }
}
