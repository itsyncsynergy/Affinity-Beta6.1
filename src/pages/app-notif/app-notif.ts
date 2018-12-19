import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController  } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
/**
 * Generated class for the AppNotifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-notif',
  templateUrl: 'app-notif.html',
})
export class AppNotifPage {
  data: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  api:string;
  customer_id:any;
  notif:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');
    this.showLoading()
    this.customerService.getList('notifications/' + this.customer_id).subscribe(response => {
      this.notif = response['notifications'];
      window.localStorage.setItem('notif_count', JSON.stringify(response['count']));

        this.data = {
          "headerTitle": "Notifications",
          "notification": this.notif
          
        }
        this.loading.dismiss();
    })

  }

  itemSelected(item){
    console.log(item);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppNotifPage');
  }

}
