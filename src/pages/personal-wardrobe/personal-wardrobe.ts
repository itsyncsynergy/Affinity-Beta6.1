import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ModalController, LoadingController} from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
// import { mobiscroll, MbscRangeOptions } from '@mobiscroll/angular';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the PersonalWardrobePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-personal-wardrobe',
  templateUrl: 'personal-wardrobe.html',
})
export class PersonalWardrobePage {

  data: any;
  customer_id: string;
  api : string;
  user_image_link: any;
  base_url:any;
  loading: "Loading";
  public selectedArray :any = [];
  public personal : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.data = {
      "background": "assets/images/background/32.jpg",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Personal Wardrobe"
    }

    this.personal = this.formBuilder.group({

      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      service: ["", Validators.required],
      occassion: [this.selectedArray],
      sex:["", Validators.required],
      accessories: ["", Validators.required],
      fav_colors: ["", Validators.required],
      fav_brands: ["", Validators.required],
      budget: ["", Validators.required]

    });

  }

  testList: any = [
    {name: "Active"},
    {name: "Business Casual/Work"},
    {name: "Laid back/Casual"},
    {name: "Date night/Night out"},
    {name: "Cocktail/Special Occasion"},
    {name: "Maternity"}

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

  sendPersonal(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true,
      duration: 5000
    });
    loader.present();

    var url = this.api + 'styling/personal_styling';
    this.data = this.http.post(url, this.personal.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">We are thrilled to hear from you. Your request has been forwarded to a member of our styling team and they’ll be in touch soon.</p>',
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
    console.log(this.personal.value)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalWardrobePage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

}
