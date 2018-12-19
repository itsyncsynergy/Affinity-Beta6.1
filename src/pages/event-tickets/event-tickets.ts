import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, Loading } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the EventTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-tickets',
  templateUrl: 'event-tickets.html',
})
export class EventTicketsPage {

  params: any = {};
  loading: Loading;
  data: any = {};
  base_url: any = ""
  events: any = {};
  user_image_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    let items = [];
    this.showLoading()

    this.data = {
      "headerTitle": "Events Ticket",
      "items": [
        {
          "id": 1,
          "category_id": 1,
          "cate_title": "Music",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/music.jpg"
        },
        {
          "id": 2,
          "category_id": 2,
          "cate_title": "Sports",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/sports.jpg"
        },
        {
          "id": 3,
          "category_id": 3,
          "cate_title": "Film & Theatre",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/film_theatre.jpg"
        },
        {
          "id": 4,
          "category_id": 4,
          "cate_title": "Fashion",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/fashion.jpg"
        },
        {
          "id": 5,
          "category_id": 5,
          "cate_title": "Award Shows",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/award_shows.jpg"
        },
        {
          "id": 6,
          "category_id": 6,
          "cate_title": "Balls & Societies",
          "link": 'EventsTicketsCategoriesPage',
          "subtitle": "",
          "image": "assets/images/background/tickets/balls_societies.jpg"
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
    this.navCtrl.push('EventsTicketsCategoriesPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventTicketsPage');
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
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(0);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

 

}
