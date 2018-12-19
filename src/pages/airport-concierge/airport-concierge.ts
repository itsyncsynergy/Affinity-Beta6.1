import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController  } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the AirportConciergePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-airport-concierge',
  templateUrl: 'airport-concierge.html',
})
export class AirportConciergePage {
   data: any;
   customer_id: string;
   api : string;
   user_image_link: any;
   base_url: any;

  public selectedArray :any = [];

   public concierge : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Airport Concierge"
    }

    this.concierge = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      request_type: ['', Validators.required],
      airport: ['', Validators.required],
      airline: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      num_pass: ['', Validators.required],
      class: ['', Validators.required],
      service: [this.selectedArray],
      others: ['', Validators.required]
     
    });

  }

  testList: any = [
    {name: "Baggage Porters"},
    {name: "Airport Lounge"},
    {name: "Push Chairs"},
    {name: "Vallet"},
    {name: "VAT Reclaim"},
    {name: "Chauffeur"},
    {name: "Prearranged Gifts"}

  ]

  selectMember(data){
    if (data.checked == true) {
    this.selectedArray.push(data);
    
    } else {
    let newArray = this.selectedArray.filter(function(el) {
  
    return el.name !== data.name;
    });
    this.selectedArray = newArray;
    }

    console.log(this.selectedArray);
  }

  sendConcierge(){

    var url = this.api + 'airport_concierge';
    this.data = this.http.post(url, this.concierge.value);
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    loader.present();
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          
          message: '<img src="assets/images/smileys/smile.png" class="emoji-align" /><p class="emoji-text">Dear '+ localStorage.getItem('firstname') + 'We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }] 
        });
        alert.present();
        console.log(data);
        return; 
      }
    });
    console.log(this.concierge.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirportConciergePage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
