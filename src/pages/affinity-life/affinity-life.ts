import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the AffinityLifePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-affinity-life',
  templateUrl: 'affinity-life.html',
})
export class AffinityLifePage {
  params: any = {};
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

    this.params.data = {
      "headerTitle": "Affinity Life",
      "items": [
        {
          "id": '1',
          "category_id": '1',
          "title": "VIP Access",
          "subtitle": "",
          "avatar2": "assets/images/background/1.jpg"
        },
        {
          "id": '2',
          "category_id": '2',
          "title": "Event Tickets",
          "subtitle": "",
          "avatar2": "assets/images/background/2.jpg"
        },
        {
          "id": '3',
          "category_id": '3',
          "title": "Styling",
          "subtitle": "",
          "avatar2": "assets/images/background/3.jpg"
        }
      ]
    }

    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('AffinityLifeCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title + category_id.title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AffinityLifePage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}
