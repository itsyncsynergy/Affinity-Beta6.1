import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the SocialWirePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-wire',
  templateUrl: 'social-wire.html',
})
export class SocialWirePage {
  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  customer_id:any;
  event:any;
  experience:any;
  interest:any;

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
    this.customerService.getList('social_wire/' + this.customer_id).subscribe(response => {
      this.event = response['event']; 
      this.experience = response['experience'];
      this.interest = response['interest'];
      console.log(this.event);
      console.log(this.experience);
      console.log(this.interest);
      this.data = {
        'headerTitle': 'Social Wire',
        'event': this.event,
        'experience': this.experience,
        'interest': this.interest
      }
      this.loading.dismiss();
    })
  }

  ionViewDidEnter(){
    this.customer_id = localStorage.getItem('customer_id');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.customerService.getList('social_wire/' + this.customer_id).subscribe(response => {
      this.event = response['event']; 
      this.experience = response['experience'];
      this.interest = response['interest'];
      console.log(this.event);
      console.log(this.experience);
      console.log(this.interest);
      this.data = {
        'headerTitle': 'Social Wire',
        'event': this.event,
        'experience': this.experience,
        'interest': this.interest
      }
     
    })
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  pageClick(id){
    this.navCtrl.push('ExperiencePackagePage', {
      id: id.id,
    })
  }

  itemClick(id){
    this.navCtrl.push('EventPage', {
      id: id.id,
    })
  }

  postClick(id){
    this.navCtrl.push('PostsPage',{
      id: id.id,
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialWirePage');
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
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(0);
    }
  }

}
