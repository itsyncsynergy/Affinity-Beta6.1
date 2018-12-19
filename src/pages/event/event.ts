import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  event: any;
  gallery: any;
  headerImage: string;
  api:string;
  email:any;

  public ticket: FormGroup

  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, private inAppBrowser: InAppBrowser) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.api = AppSettings.API_ENDPOINT;
    this.email = localStorage.getItem('username');
    console.log(navParams.data.id)
    this.showLoading()
    this.customerService.getList('event/' + navParams.data.id).subscribe(response => {
          
      this.event = response['event'];
      this.gallery = response['gallery'];
      this.headerImage = this.event.avatar;
      console.log(response);
      this.data = {
        "avatar": this.event.avatar,
        "headerImage": this.event.headerImage,
        "headerTitle": this.event.name,
        "details": this.event.description,
        "category": navParams.data.cate_title,
        "title": this.event.name,
        'ntk': this.event.ntk,
        "price": this.event.price,
        "curr": this.event.curr,
        'address': this.event.location,
        //"gallery": this.gallery,
        "gimage": response['gimage'],
        //"items": this.offers,
        "items": [
          {
            "id": 1,
            "title": this.event.name,
            "subtitle": "View Gallery",
            "image": response['gimage'],
            "items": this.gallery
          }
        ]
      }
      //this.loading.dismiss();

      this.data.gallery = {
            "items": [
                {
                  "id": 1,
                  "title": this.event.name,
                  "subtitle": "View Gallery",
                  "image": response['gimage'],
                  "items": this.gallery
                }
            ]
        };

      this.data.gallery.subGallery = "ItemDetailsPageSubImageGallery";
      this.data.gallery.fullscreen = "ItemDetailsPageFullScreenGallery";

      this.loading.dismiss();
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
    console.log('ionViewDidLoad EventPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  buy(){
    // this.navCtrl.push('AttendPaymentPage', {
    //   price: this.event.price,
    //   event_id: this.event.event_id,
    //   event_name: this.event.name
    // });
    this.ticket = this.formBuilder.group({
      email: [this.email],
      amount: [this.event.price],
      currency: [this.event.curr],
      customer_id: [localStorage.getItem('customer_id')],
      event_id: [this.event.event_id]

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
               
                let url = this.api + 'customer_event';
                this.data = this.http.post(url, this.ticket.value);
                this.data.subscribe(response => {
                  if (response['error'] == false) {
                    
                    window.localStorage.setItem('activities', JSON.stringify(response['activities']));
                    loader.dismiss();
  
                    let alert = this.alertCtrl.create({
                      message: '<img src="assets/images/smileys/excited.png" class="emoji-align" /><p class="emoji-text">Awesome! You are one of the cool people attending the '+ this.event.name + '. Kindly check your email for more information.</p>',
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
