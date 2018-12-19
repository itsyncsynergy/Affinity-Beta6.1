import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the ExclusiveOffersCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exclusive-offers-categories',
  templateUrl: 'exclusive-offers-categories.html',
})
export class ExclusiveOffersCategoriesPage {

  params: any = {};
  loading: Loading;
  base_url: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    let items = [];
    this.showLoading()
    console.log(navParams.data.id);
    this.customerService.getList('exclusive_offer/' + navParams.data.id).subscribe(response => {


      items = response;
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
        navCtrl.push('MerchantOfferListPage', {
          id: category_id.id,
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExclusiveOffersCategoriesPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}
