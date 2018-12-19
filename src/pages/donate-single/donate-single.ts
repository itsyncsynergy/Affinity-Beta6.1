import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the DonateSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-donate-single',
  templateUrl: 'donate-single.html',
})
export class DonateSinglePage {
  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  donate: any;
  headerImage: string;

  params: any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, private inAppBrowser: InAppBrowser, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    console.log(navParams.data.id)
    this.showLoading()
    this.customerService.getList('donation/' + navParams.data.id).subscribe(response => {
         
      this.donate = response;
      
      this.headerImage = this.donate.avatar;
      console.log(response);
      this.data = {
        "avatar": this.donate.avatar,
        "headerImage": this.headerImage,
        "headerTitle": this.donate.title,
        "details": this.donate.post,
        // "category": navParams.data.cate_title,
        "title": this.donate.title,
        'website': this.donate.website,
        "phone": this.donate.phone,
       
      }
      this.loading.dismiss();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonateSinglePage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  callWithNumber(mobileNumber) {
    window.open("tel:" + mobileNumber);
  }

  openWebsite() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(this.donate.website, '_self', options);
  }
  

  Donate(){
    window.open(this.donate.website, '_system');

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',

    });
    this.loading.present();
  }

}
