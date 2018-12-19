import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the DonateVolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate-volunteer',
  templateUrl: 'donate-volunteer.html',
})
export class DonateVolunteerPage {
  data: any = {};
  params: any = {};
  loading: Loading;
  base_url: any = ""
  user_image_link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.data = {
      "headerTitle": "Get Involved",
      "items": [
        {
          "id": '1',
          "category_id": '1',
          "title": "Volunteer",
          "subtitle": "",
          "avatar2": "assets/images/background/volunteer/volunteer.jpg"
        },
        {
          "id": '2',
          "category_id": '2',
          "title": "Donate",
          "subtitle": "",
          "avatar2": "assets/images/background/donate/donate_page.jpg"
        }
      ]
    }

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        if (category_id.id == 1) {
          navCtrl.push('VolunteerPage')
        } else {
          navCtrl.push('DonatePage')
        }
      }
    }
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  pageClick(id) {
    console.log(id);
    if (id.id == 1) {
      this.navCtrl.push('VolunteerPage')
    } else if (id.id == 2) {
      this.navCtrl.push('DonatePage')
    } 
  }

  swipe(event){
    if (event.direction == 4) {
      this.navCtrl.parent.select(2);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonateVolunteerPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
    });
    //this.loading.present();
  }
  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}
