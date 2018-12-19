import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the VipAccessCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vip-access-categories',
  templateUrl: 'vip-access-categories.html',
})
export class VipAccessCategoriesPage {

  params: any = {};
  loading: Loading;
  base_url: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    let items = [];
    this.showLoading()
    console.log(navParams.data.id);
    this.customerService.getList('access/events/' + navParams.data.id).subscribe(response => {

      items = response;
      console.log(items);
      this.params.data = {
        "headerTitle": this.navParams.data.title,
        "items": items
      }
      this.loading.dismiss();
    })

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log('got here 211')
        console.log(category_id.id);
        navCtrl.push('VipAccessListPage', {
          id: category_id.id,
          cate_name: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VipAccessCategoriesPage');
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

}
