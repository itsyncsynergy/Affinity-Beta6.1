import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';
import { IService } from '../../services/IService';

import { ProfileLeftPage } from "../profile-left/profile-left";
import { AppSettings } from "../../app/appSettings";
import { CustomerService } from '../../services/customer.service';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  data: any;
  events: any;
  
  user: any = [];
  page: any;
  service: IService;
  params: any = {};
  user_image_link: any;

  scrollViewOptions: any = {
    layout: 'fixed',
    itemWidth: 134,
    snap: false
  }

  loading: Loading;
  base_url: any = "";
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private customerService: CustomerService,
    public loadingCtrl: LoadingController ) {
    this.user_image_link = localStorage.getItem('base_url') + localStorage.getItem('avatar');
    let feeds = [];
    this.showLoading()
    this.base_url = AppSettings.BASE_URL;

    //get the feeds
    this.customerService.getList('feeds').subscribe(response => {


      feeds = response;
      this.data = {
        "headerTitle": this.navParams.data.title,
        "feeds": feeds
      }
      this.loading.dismiss();
    })

    //get the close to you suggestion

    //get the suggestions

    

    this.events = {
      'onItemClick': function (item: any) {
        console.log('onItemClick');
      },
      'onRates': function (index: number) {
        console.log('onRates');
      },
      'onCheckBoxClick': function (item: any) {
        console.log('onCheckBoxClick');
      },
      'onButtonClick': function (item: any) {
        console.log('onButtonClick');
      }
    };

    
    // If we navigated to this page, we will have an item available as a nav param
    this.page = navParams.get('page');
    this.service = navParams.get('service');
    
  }

  onProfile() {
    this.modalCtrl.create(ProfileLeftPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  onEvent(event: string, item: any, e: any) {
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  onStarClass(items: any, index: number, e: any) {
    for (var i = 0; i < items.length; i++) {
      items[i].isActive = i <= index;
    }
    this.onEvent("onRates", index, e);
  };

  toggleGroup(group: any) {
    group.show = !group.show;
  }

  isGroupShown(group: any) {
    return group.show;
  }
  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
