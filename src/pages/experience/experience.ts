import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

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
  data:any;
  base_url:any;
  user_image_link: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    let items = [];
    this.showLoading()
    this.data = {
      "headerTitle": "Experiences",
    
      "items": [
        {
          "id": 1,
          "category_id": 1,
          "cate_title": "Dining",
          "link": 'ExperienceCategoriesPage',
          "subtitle": "",
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
          "cate_title": "Art & Crafts",
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
        },
        {
          "id": 8,
          "category_id": 8,
          "cate_title": "Adventure",
          "link": 'ExperienceCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/experience/adventure.jpg"
        }
      ]
    }

    this.loading.dismiss();


    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      
    }
  }

  onItemClick(category_id) {
    console.log(category_id);
    this.navCtrl.push('ExperienceCategoriesPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencePage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(1);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  

}