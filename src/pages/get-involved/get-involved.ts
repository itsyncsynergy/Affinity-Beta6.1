import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the GetInvolvedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-involved',
  templateUrl: 'get-involved.html',
})
export class GetInvolvedPage {

  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];
    this.showLoading()
    this.customerService.getList('donation_categories').subscribe(response => {
      items = response;
      this.params.data = {
        "headerTitle": "Get Involved",
        "items": items
      }
      this.loading.dismiss();
    })


    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('GetInvolvedCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetInvolvedPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}