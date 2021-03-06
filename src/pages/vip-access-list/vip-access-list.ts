import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the VipAccessListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vip-access-list',
  templateUrl: 'vip-access-list.html',
})
export class VipAccessListPage {

  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  event: any;
  gallery: any;
  headerImage: string;
  customer_id:any;
  api : string;
  event_id:any;
  category_id:any;

  params: any = {}


  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');

    let items = [];
      console.log(navParams.data.id);
      this.showLoading()
      this.customerService.getList('access/single/' + navParams.data.id).subscribe(response => {
        
        this.event = response['event'];
        this.gallery = response['gallery'];
        this.headerImage = this.event.avatar;
        console.log(response);
        this.data = {
          "avatar": this.event.avatar,
          "headerImage": this.event.cover_image,
          "headerTitle": this.event.title,
          "details": this.event.details,
          "category": navParams.data.cate_title,
          "title": this.event.title,
          'curr': this.event.curr,
          "price": this.event.price,
          'address': this.event.city + ", " + this.event.country,
          "gallery": this.gallery,
          "gimage": response['gimage'],
          "customer_id": localStorage.getItem('customer_id'),
          "event_id": this.event.id,
          "category_id": this.event.category_id,
          //"items": this.offers,
          "items": [
            {
              "id": 1,
              "title": this.event.title,
              "subtitle": "View Gallery",
              "image": response['gimage'],
              "items": this.gallery
            }
          ]
        }
        //this.loading.dismiss();

        this.data.gallery = {
              "items": [
                  {
                    "id": 1,
                    "title": this.event.title,
                    "subtitle": "View Gallery",
                    "image": response['gimage'],
                    "items": this.gallery
                  }
              ]
          };

        this.data.gallery.subGallery = "ItemDetailsPageSubImageGallery";
        this.data.gallery.fullscreen = "ItemDetailsPageFullScreenGallery";
        this.loading.dismiss();
      })

      this.events = {
        'onProceed': function (item: any) {
          console.log("onProceed");
        },
        'onShare': function (item: any) {
          console.log("onShare");
        },
        'onItemClick': function (item: any) {
          console.log("onItemClick");
          // navCtrl.push('MerchantOfferPage')
        },
      };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VipAccessListPage');
  }

  request(){
    console.log('Request button pressed');
    this.navCtrl.push('VipAccessRequestPage',{
      id: this.navParams.data.id,
      category_id: this.event.category_id,
      title: this.event.title
    })

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

  openSubGallery = (group: any, index: number): any => {
    this.navCtrl.push(group.subGallery, {
      'group': group.items[index],
      'events': this.events,
      'layout': 1
    });
  }

}
