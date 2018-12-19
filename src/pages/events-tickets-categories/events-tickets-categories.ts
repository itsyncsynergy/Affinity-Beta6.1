import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the EventsTicketsCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-events-tickets-categories',
  templateUrl: 'events-tickets-categories.html',
})
export class EventsTicketsCategoriesPage {

  params: any = {};
  loading: Loading;
  base_url: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    let items = [];
    this.showLoading()
    console.log(navParams.data.id);
    this.customerService.getList('tickets/events/' + navParams.data.id).subscribe(response => {

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
        navCtrl.push('EventsTicketsListPage', {
          id: category_id.id,
          cate_name: category_id.cate_title
        })
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsTicketsCategoriesPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}
