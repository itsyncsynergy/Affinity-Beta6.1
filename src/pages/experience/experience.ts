import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the ExperiencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experience',
  templateUrl: 'experience.html',
})
export class ExperiencePage {
  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];
    this.showLoading()
    this.customerService.getList('experiences_categories').subscribe(response => {
      items = response;
      this.params.data = {
        "headerTitle": "Experiences",
        // "items": items
        "items": [
          {
            "id": 1,
            "category_id": 1,
            "cate_title": "Dining",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "apartments",
            "image": "assets/images/background/experience/dining.jpg"
          },
          {
            "id": 2,
            "category_id": 2,
            "cate_title": "Drinks & Tastings",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/drinks_tastings.jpg"
          },
          {
            "id": 3,
            "category_id": 3,
            "cate_title": "Art & Supplies",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/art_supplies_brushes_rulers_scissors_159644.jpeg"
          },
          {
            "id": 4,
            "category_id": 4,
            "cate_title": "Spa & Pampering",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/spa_pampering.jpg"
          },
          {
            "id": 5,
            "category_id": 5,
            "cate_title": "Get-Aways",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/getaways.jpg"
          },
          {
            "id": 6,
            "category_id": 6,
            "cate_title": "Tours & Activites",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/tours_activities.jpg"
          },
          {
            "id": 7,
            "category_id": 7,
            "cate_title": "Sports",
            "link": 'ExperienceCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/experience/sports.jpeg"
          }
        ]
      }
      //this.loading.dismiss();
    })


    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('ExperienceCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencePage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}