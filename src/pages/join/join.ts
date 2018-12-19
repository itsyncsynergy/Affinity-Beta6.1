import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { InterestService } from '../../services/interest.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {
  params: any = {};
  loading: Loading;
  user_image_link: any;
  base_url: any = ""
  interests: any = [];
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public interestService: InterestService, public customerService: CustomerService, public loadingCtrl: LoadingController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    let items = [];
    this.showLoading()
    //this.interests = response;
    this.data = {
      // "items": response,
      "selectedItem": 1,
      "title": "Select membership option",
      "headerTitle": "Join",
      "items": [
        {
          "id": 1,
          "category_id": 25,
          "cate_title": "Networking",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/networking.jpg"
        },
        {
          "id": 2,
          "category_id": 6,
          "cate_title": "Relationship",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/relationship.jpg"
        },
        {
          "id": 3,
          "category_id": 15,
          "cate_title": "Music",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/music.jpg"
        },
        {
          "id": 4,
          "category_id": 9,
          "cate_title": "Motherhood",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/motherhood.jpg"
        },
        {
          "id": 5,
          "category_id": 16,
          "cate_title": "Tech",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/tech.jpg"
        },
        {
          "id": 6,
          "category_id": 4,
          "cate_title": "Food",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/food.jpg"
        },
        {
          "id": 7,
          "category_id": 8,
          "cate_title": "Fashion",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/fashion.jpg"
        },
        {
          "id": 8,
          "category_id": 11,
          "cate_title": "Fitness & Wellness",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/fitness_wellness.jpg"
        },
        {
          "id": 9,
          "category_id": 21,
          "cate_title": "Film & Theatre",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/film_theatre.jpg"
        },
        {
          "id": 10,
          "category_id": 27,
          "cate_title": "Beauty",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/beauty.jpg"
        },
        {
          "id": 11,
          "category_id": 13,
          "cate_title": "Arts & Culture",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/arts_culture.jpg"
        },
        {
          "id": 12,
          "category_id": 10,
          "cate_title": "Nightlife",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/nightlife.jpg"
        },
        {
          "id": 13,
          "category_id": 7,
          "cate_title": "Travel & Adventure",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/travel_adventure.jpg"
        },
        {
          "id": 14,
          "category_id": 23,
          "cate_title": "Wine & Beverages",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/wine_beverages.jpg"
        },
        {
          "id": 15,
          "category_id": 14,
          "cate_title": "Charity",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/charity.jpg"
        },
        {
          "id": 16,
          "category_id": 5,
          "cate_title": "Sports",
          "link": 'ProductCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/interest/sports.jpg"
        }
      ]
    }
    //interests = interests;

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      
    };
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  onItemClick(category_id) {
    console.log(category_id);
    this.navCtrl.push('InterestPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(0);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}