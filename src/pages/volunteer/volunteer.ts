import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the VolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})
export class VolunteerPage {


  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];
    this.showLoading()

      this.params.data = {
        "headerTitle": "Volunteer",
        "items": [
          {
            "id": 2,
            "category_id": 2,
            "cate_title": "Child Care",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/child_care.jpg"
          },
          {
            "id": 3,
            "category_id": 3,
            "cate_title": "Women Empowerment",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/women.jpg"
          },
          {
            "id": 4,
            "category_id": 4,
            "cate_title": "Teaching",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/teaching.jpg"
          },
          {
            "id": 5,
            "category_id": 5,
            "cate_title": "Orphanage",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/orphanage.jpg"
          },
          {
            "id": 6,
            "category_id": 6,
            "cate_title": "Renovations and Construction",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/renovations_constructions.jpg"
          },
          {
            "id": 7,
            "category_id": 7,
            "cate_title": "Medical",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/medical.jpg"
          },
          {
            "id": 8,
            "category_id": 8,
            "cate_title": "Special Needs Care",
            "link": 'VolunteerCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/volunteer/special_care.jpg"
          }
        ]
      }
      //this.loading.dismiss(); donation


    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('VolunteerCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}