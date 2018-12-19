import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the NewOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-offers',
  templateUrl: 'new-offers.html',
})
export class NewOffersPage {

  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  customer_id:any;
  product:any;
  offer:any;

  scrollViewOptions: any = {
    layout: 'fixed',
    itemWidth: 134,
    snap: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.customer_id = localStorage.getItem('customer_id');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.showLoading()

    this.customerService.getList('new_offers/' + this.customer_id).subscribe(response => {
      this.product = response['product']; 
      this.offer = response['offer'];
      console.log(this.product);
      this.data = {
        'headerTitle': 'New Offers',
        'product': this.product,
        'offer': this.offer
  
      }
      this.loading.dismiss();
    })

    
  }

  ionViewDidEnter() {
    this.customer_id = localStorage.getItem('customer_id');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.customerService.getList('new_offers/' + this.customer_id).subscribe(response => {
      this.product = response['product']; 
      this.offer = response['offer'];
      console.log(this.product);
      this.data = {
        'headerTitle': 'New Offers',
        'product': this.product,
        'offer': this.offer
  
      }
      
    })
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  pageClick(id){
    this.navCtrl.push('ProductPage', {
      id: id.id,
    })
  }

  itemClick(id){
    this.navCtrl.push('MerchantOfferListPage', {
      id: id.id,
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  swipe(event) {
    if(event.direction == 4) {
      this.navCtrl.parent.select(1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOffersPage');
  }

}
