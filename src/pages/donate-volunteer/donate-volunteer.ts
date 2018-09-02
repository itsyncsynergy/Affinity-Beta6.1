import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

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
  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

    this.params.data = {
      "headerTitle": "Affinity Life",
      "items": [
        {
          "id": '1',
          "category_id": '1',
          "title": "Volunteer",
          "subtitle": "",
          "avatar2": "assets/images/background/volunteer.jpg"
        },
        {
          "id": '2',
          "category_id": '2',
          "title": "Donate",
          "subtitle": "",
          "avatar2": "assets/images/background/donate.jpg"
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonateVolunteerPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}
