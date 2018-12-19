import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController , Loading, ViewController, ToastController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the MembershipInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-membership-interest',
  templateUrl: 'membership-interest.html',
})
export class MembershipInterestPage {
  data:any;
  api : string;
  loading: Loading;
  base_url: any = "";
  selectedMembership: number = 1;
  customer_id:any;
  // userSelect:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController,  public toastCtrl: ToastController) {

    this.customer_id = localStorage.getItem('customer_id');

    this.base_url = AppSettings.BASE_URL;
    this.api = AppSettings.API_ENDPOINT;
    this.showLoading()
    this.data = {
      "headerTitle": "Interests",
      "interests": [
        {
          "group_id": 25,
          "name": "Networking",
          "image": "assets/images/background/interest/networking.jpg"
        },
        {
          "group_id": 6,
          "name": "Relationship",
          "image": "assets/images/background/interest/relationship.jpg"
        },
        {
          "group_id": 15,
          "name": "Music",
          "image": "assets/images/background/interest/music.jpg"
        },
        {
          "group_id": 9,
          "name": "Motherhood",
          "image": "assets/images/background/interest/motherhood.jpg"
        },
        {
          "group_id": 16,
          "name": "Tech",
          "image": "assets/images/background/interest/tech.jpg"
        },
        {
          "group_id": 4,
          "name": "Food",
          "image": "assets/images/background/interest/food.jpg"
        },
        {
          "group_id": 8,
          "name": "Fashion",
          "image": "assets/images/background/interest/fashion.jpg"
        },
        {
          "group_id": 11,
          "name": "Fitness & Wellness",
          "image": "assets/images/background/interest/fitness_wellness.jpg"
        },
        {
          "group_id": 21,
          "name": "Film & Theatre",
          "image": "assets/images/background/interest/film_theatre.jpg"
        },
        {
          "group_id": 27,
          "name": "Beauty",
          "image": "assets/images/background/interest/beauty.jpg"
        },
        {
          "group_id": 13,
          "name": "Arts & Culture",
          "image": "assets/images/background/interest/arts_culture.jpg"
        },
        {
          "group_id": 10,
          "name": "Nightlife",
          "image": "assets/images/background/interest/nightlife.jpg"
        },
        {
          "group_id": 7,
          "name": "Travel & Adventure",
          "image": "assets/images/background/interest/travel_adventure.jpg"
        },
        {
          "group_id": 23,
          "name": "Wine & Beverages",
          "image": "assets/images/background/interest/wine_beverages.jpg"
        },
        {
          "group_id": 14,
          "name": "Charity",
          "image": "assets/images/background/interest/charity.jpg"
        },
        {
          "group_id": 5,
          "name": "Sports",
          "image": "assets/images/background/interest/sports.jpg"
        }
      ]
    }
    this.loading.dismiss();
  }

  skip(){
    var userSelect = localStorage.getItem('pickedInterest');

    if (userSelect < '3') {
      this.presentToast();
    }
    else {
      this.navCtrl.push('MembershipOptionPage')
    }
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Pick at least 3",
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  GoBack(){
    this.navCtrl.pop();
  }

  select(item: any) {
    console.log(item.id);
    this.selectedMembership = item.id;
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
    console.log('Customer with' + this.customer_id + 'selected group_id of' + value + ' clicked with ' + action + ' activated');
    this.customerService.getList('pick_interest/' + this.customer_id + '/' + value +'/'+ action).subscribe(response => {
      if (response['error'] == false) {
        localStorage.setItem('interest', JSON.stringify(response['interest']));
        localStorage.setItem('pickedInterest', JSON.stringify(response['userSelect']));
        console.log(response);
        console.log(localStorage.getItem('interest'));
        console.log(localStorage.getItem('pickedInterest'));
      }

    })

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipInterestPage');
  }

}
