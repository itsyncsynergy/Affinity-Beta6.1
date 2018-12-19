import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, Loading} from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the VipAccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vip-access',
  templateUrl: 'vip-access.html',
})
export class VipAccessPage {

  data: any = {};
  events: any = {};
  user_image_link: any;
  base_url:any =""
  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    let items = [];
    this.showLoading()
    this.params.data = {
      "headerTitle": "Access",
      "items": [
        {
          "id": 1,
          "category_id": 1,
          "cate_title": "Table Bookings",
          "link": 'VipAccessCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/vip_access/table_bookings.jpg"
          
        },
        {
          "id": 2,
          "category_id": 2,
          "cate_title": "Private Parties",
          "link": 'VipAccessCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/vip_access/private_parties.jpg"
        },
        {
          "id": 3,
          "category_id": 3,
          "cate_title": "Members Only Club",
          "link": 'VipAccessCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/vip_access/members_only_clubs.jpg"
        }
      ]
      
    }

    this.loading.dismiss();

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
     
      
    }
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  onItemClick(category_id) {
    console.log(category_id);
    this.navCtrl.push('VipAccessCategoriesPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VipAccessPage');
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
    if(event.direction === 2) {
      this.navCtrl.parent.select(1);
    }
   
  }

}
