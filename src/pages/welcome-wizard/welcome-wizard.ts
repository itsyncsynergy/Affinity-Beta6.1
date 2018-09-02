import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WelcomeWizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-wizard',
  templateUrl: 'welcome-wizard.html',
})


export class WelcomeWizardPage {
  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      "btnFinish": "Finish",
      "btnNext": "Next",
      "items": [{
        "backgroundImage": "assets/images/background/21.jpg",
        "subtitle": "A lifestyle club that offers unbeatable discounts from trustworthy merchants",
        "title": "ENJOY A TOP CLASS LIFESTYLE THAT SUITS YOU"
      }, {
        "backgroundImage": "assets/images/background/22.jpg",
        "subtitle": "Page 2",
        "title": "Lorem ipsum dolor sit amet, consectetur"
      }, {
        "backgroundImage": "assets/images/background/23.jpg",
        "subtitle": "Page 3",
        "title": "Lorem ipsum dolor sit amet, consectetur"
      }]
    }

    this.params.events = {
      'onFinish': function (event: any) {
        console.log('Finish');
      },
      'onRegister': function (event: any) {
        this.navCtrl.push('SignupPage');
      },
      'onLogin': function (event: any) {
        this.nav.setRoot('LoginPage');
      },

    };
  }

  registerPage(){
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeWizardPage');
  }

}
