import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the LuxuryPackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-luxury-packages',
  templateUrl: 'luxury-packages.html',
})
export class LuxuryPackagesPage {


  params: any = {};
  loading: Loading;
  base_url: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    let items = [];
    this.showLoading()
    console.log(navParams.data.id);
    this.customerService.getList('luxury_travel').subscribe(response => {


      items = response;
      this.params.data = {
        "headerTitle": 'Luxury Packages',
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
        navCtrl.push('LuxuryPackagePage', {
          id: category_id.id,
          cate_name: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LuxuryPackagesPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}