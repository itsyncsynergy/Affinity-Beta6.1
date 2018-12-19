import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';


/**
 * Generated class for the MembershipCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-card',
  templateUrl: 'membership-card.html',
})
export class MembershipCardPage {

  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  subscription:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log(navParams.data.customer_id);
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.showLoading()

    this.customerService.getList('sub_details/' + navParams.data.customer_id).subscribe(response => {
      this.subscription = response['subscription']; 
      if (this.subscription != null) {
        localStorage.setItem('subscription', JSON.stringify(response['subscription']));
        console.log(this.subscription);
        this.data = {

          "headerTitle": "My Card",
          "membership": this.subscription.membership,
          "username" : localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
          "customer_id": navParams.data.customer_id,
          "Exp_Date": this.subscription.end_date,
          "avatar1": "assets/images/membership_cards/essence.png",
          "avatar2": "assets/images/membership_cards/luxe.png",
          "avatar3": "assets/images/membership_cards/premium.png"
         

        }
      }else{
        this.data = {

          "headerTitle": "My Card",
          "membership": this.subscription
        }
      }
       
      this.loading.dismiss();
    })

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCardPage');
  }

}
