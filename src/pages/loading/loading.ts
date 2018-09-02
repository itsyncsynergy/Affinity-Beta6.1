import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})

export class LoadingPage {

  params:any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.params.data = {
      "duration": 10000,
      "backgroundImage": 'assets/images/splashscreen/1.jpg',
      "logo": "assets/images/logo/2.png",
      "title": "Welcome to the moon"
    };
    this.params.events = {
      "onRedirect": function () {
        navCtrl.pop();
      }
    };
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
  }

}
