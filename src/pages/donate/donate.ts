import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
  data:any;
  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];
    this.showLoading()

    this.params.data = {
        "headerTitle": "Donations",
        "items": [
          {
            "id": 1,
            "category_id": 1,
            "cate_title": "Bereaved Family Support",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/bereavedsupport.jpg"
          },
          {
            "id": 2,
            "category_id": 2,
            "cate_title": "Charity Organisation",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/charity_organization.jpg"
          },
          {
            "id": 3,
            "category_id": 3,
            "cate_title": "Community Service Projects",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/community_service.jpg"
          },
          {
            "id": 4,
            "category_id": 4,
            "cate_title": "Disaster Support",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/disaster_support.jpg"
          },
          {
            "id": 5,
            "category_id": 5,
            "cate_title": "Food",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/food.jpg"
          },
          {
            "id": 6,
            "category_id": 6,
            "cate_title": "Help for the sick",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/help.jpg"
          },
          {
            "id": 7,
            "category_id": 7,
            "cate_title": "Hospital support",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/hospital_support.jpg"
          },
          {
            "id": 8,
            "category_id": 8,
            "cate_title": "Human Rights",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/human_right.jpg"
          },
          {
            "id": 9,
            "category_id": 9,
            "cate_title": "Humanitarian Assistance",
            "link": 'DonationCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/donate/humanitarian_assistance.jpg"
          }
        ]
    }
    this.loading.dismiss();
 
    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('DonationCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}