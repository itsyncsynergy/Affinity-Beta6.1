import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController  } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
/**
 * Generated class for the ExperiencePackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-experience-package',
  templateUrl: 'experience-package.html',
})
export class ExperiencePackagePage {
  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  experience: any;
  gallery: any;
  headerImage: string;
  api:string;
  email:any;

  params: any = {}
  public ticket: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private inAppBrowser: InAppBrowser) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.api = AppSettings.API_ENDPOINT;
    console.log(navParams.data.id);
    this.email = localStorage.getItem('username');
    this.showLoading()
    this.customerService.getList('experience/' + navParams.data.id).subscribe(response => {
        
        
      this.experience = response['experience'];
      this.gallery = response['gallery'];
      this.headerImage = this.experience.avatar;
      console.log(response);
      this.data = {
        "avatar": this.experience.avatar,
        "headerImage": this.experience.headerImage,
        "headerTitle": this.experience.experience_name,
        "details": this.experience.details,
        "category": navParams.data.cate_title,
        "title": this.experience.experience_name,
        'ntk': this.experience.ntk,
        "price": this.experience.price,
        "curr": this.experience.curr,
        "validity": this.experience.validity,
        'address': this.experience.venue + ", " + this.experience.state,
        //"gallery": this.gallery,
        "gimage": response['gimage'],
        //"items": this.offers,
        "items": [
          {
            "id": 1,
            "title": this.experience.experience_name,
            "subtitle": "View Gallery",
            "image": response['gimage'],
            "items": this.gallery
          }
        ]
      }
      this.loading.dismiss();

      this.data.gallery = {
            "items": [
                {
                  "id": 1,
                  "title": this.experience.experience_name,
                  "subtitle": "View Gallery",
                  "image": response['gimage'],
                  "items": this.gallery
                }
            ]
        };

      this.data.gallery.subGallery = "ItemDetailsPageSubImageGallery";
      this.data.gallery.fullscreen = "ItemDetailsPageFullScreenGallery";
    })

    this.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
        navCtrl.push('MerchantOfferPage')
      },
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencePackagePage');
  }
  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  buy(){
    // this.navCtrl.push('ExperiencePaymentPage', {
    //   price: this.experience.price,
    //   exp_name: this.experience.experience_name,
    //   exp_id: this.experience.experience_id
    // });
    this.ticket = this.formBuilder.group({
      email: [this.email],
      amount: [this.experience.price],
      currency: [this.experience.curr],
      customer_id: [localStorage.getItem('customer_id')],
      experience_id: [this.experience.experience_id]

    })

    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
    });
    loader.present();
    var  headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer sk_live_41ccf34718c80ef53509cef979a72446948b1f8a'

    });
    var url = 'https://api.paystack.co/transaction/initialize';
    this.data = this.http.post(url, this.ticket.value, { headers: headers });
    this.data.subscribe(data => {
      if (data['status'] == true){
        
        const browser = this.inAppBrowser.create(data.data.authorization_url, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=DONE');

        browser.on('exit').subscribe(() => {
          console.log('Exit button');
          var url = 'https://api.paystack.co/transaction/verify/' + data.data.reference;
          this.data = this.http.get(url, { headers: headers });
          this.data.subscribe(data => {
            if (data.data.status == 'success') {
             
              let url = this.api + 'customer_experience';
              this.data = this.http.post(url, this.ticket.value);
              this.data.subscribe(response => {
                if (response['error'] == false) {
                  loader.dismiss();

                  let alert = this.alertCtrl.create({
                    message: '<img src="assets/images/smileys/excited.png" class="emoji-align" /><p class="emoji-text">Awesome! You are one of the cool people attending the '+ this.experience.experience_name + '. Kindly check your email for more information.</p>',
                    buttons: [{
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }] 
                  });
                  alert.present();
                  console.log(data);
                }
              })
              
            }
          });

          
        });
         
        console.log(data);
      }
      else if (data['status'] == 400){
        let alert = this.alertCtrl.create({
          title: 'Notification',
          message: 'Currency not supported by merchant',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }] 
        });
        alert.present();
      }
      console.log(data);
    });
    console.log(this.ticket.value)
  }

  openSubGallery = (group: any, index: number): any => {
    this.navCtrl.push(group.subGallery, {
      'group': group.items[index],
      'events': this.events,
      'layout': 1
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}
