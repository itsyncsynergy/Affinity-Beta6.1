import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, ItemSliding, Item } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the FeedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  membership:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, private inAppBrowser: InAppBrowser, public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
   
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.membership = localStorage.getItem('membership');

    this.showLoading()

    this.customerService.getList('feeds').subscribe(response => {
         let items = [];
         items = response; 

         console.log(items);

      this.data = {
        'headerTitle': 'Feeds',
        'membership': this.membership,
        'items': items
      }

    this.loading.dismiss();
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  ionViewDidEnter() {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.membership = localStorage.getItem('membership');

    this.customerService.getList('feeds').subscribe(response => {
      let items = [];
      items = response; 

      console.log(items);
      this.data = {
        'headerTitle': 'Feeds',
        'membership': this.membership,
        'items': items
      }
    })

  }

  single(id) {
    console.log(id);
    this.navCtrl.push('FeedPage', {
      id : id
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

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

}
