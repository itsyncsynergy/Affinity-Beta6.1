import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InterestService } from '../../services/interest.service';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the MembershipOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-option',
  templateUrl: 'membership-option.html',
})
export class MembershipOptionPage {

  data: any = {};
  events: any = {};
  selectedMembership: number = 1;
  interests: any = [];

  buttonClass: string = "button-clear-outline outline round ion-button interest-button";


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public interestService: InterestService, public customerService: CustomerService) {

    //get the list of interets

    this.interestService.getInterests().subscribe(response => {
      //this.interests = response;
      this.data = {
        "items": [{
          "id": 1,
          "subtitle": "Learn More..",
          "title": "Essence "
        }, {
          "id": 2,
          "subtitle": "Learn More..",
          "title": "Premium"
        }, {
          "id": 3,
          "subtitle": "Learn More..",
          "title": "Luxe"
        }],
        "selectedItem": 1,
        "title": "Select membership option",
        "interests": response
      }
      //interests = interests;

      this.events = {
        'onSelect': function (item: any) {
          console.log("onSelect");
        }
      };

    })




  }

  select(item: any) {
    console.log(item.id);
    this.selectedMembership = item.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipOptionPage');
  }

  membershipOptionDetails(item: any) {
    console.log(item.id);
    //get the membership option details
    let verifyModal = this.modalCtrl.create('MembershipOptionDetailsPage', item);
    verifyModal.present();

  }

  toggleInterestButton(hide, show, value, action): void {
    //hide the clicked button
    document.getElementById(hide).style.display = "none";
    //show the new button
    document.getElementById(show).style.display = "";
    //update interest list
    this.updateInterestList(value, action)
  }

  updateInterestList(value, action) {
    console.log(value + ' clicked with ' + action + ' action');
    //

  }

  pay() {
    this.navCtrl.push('SubscriptionPage')
  }

  skip() {
    this.navCtrl.setRoot('TabsPage')
  }

}
