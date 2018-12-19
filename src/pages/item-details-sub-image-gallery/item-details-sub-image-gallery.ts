import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { IService } from '../../services/IService';

@IonicPage()
@Component({
    templateUrl: 'item-details-sub-image-gallery.html'
})
export class ItemDetailsPageSubImageGallery {

    page: any;
    service: IService;
    params: any = {};
    user_image_link: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController) {
      this.user_image_link = localStorage.getItem('base_url') + localStorage.getItem('avatar');
        this.params = {};
        this.params.events = navParams.get('events');
        if (navParams.get('group')) {
            this.params.data = navParams.get('group');
            this.params.data.fullscreen = "ItemDetailsPageFullScreenGallery";
        } else {
            navCtrl.setRoot("HomePage");
        }		
    }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }
}
