import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the LuxuryPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-luxury-package',
  templateUrl: 'luxury-package.html',
})
export class LuxuryPackagePage {

  data: any;
  events: any;
  loading: Loading;
  merchant: any;
  reviews: any;
  base_url: any = ""
  user_image_link: any;
  packages: any;
  gallery: any;
  headerImage: string;

  params: any = {}
  api:string;

  public ticket: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, private inAppBrowser: InAppBrowser) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.api = AppSettings.API_ENDPOINT;
    let items = [];
    this.showLoading()
    console.log(navParams.data.id);

    this.customerService.getList('luxury_travel/' + navParams.data.id).subscribe(response => {


      this.packages = response['packages'];
      this.gallery = response['gallery'];
      this.headerImage = this.packages.avatar;
      console.log(response);
      this.data = {
        "avatar": this.packages.avatar,
        "headerImage": this.packages.headerImage,
        "headerTitle": this.packages.experience_name,
        "details": this.packages.details,
        "overview": this.packages.overview,
        "category": navParams.data.cate_title,
        "title": this.packages.experience_name,
        'ntk': this.packages.ntk,
        "price": this.packages.price,
        "curr": this.packages.curr,
        'address': this.packages.venue + ", " + this.packages.state,
        //"gallery": this.gallery,
        "gimage": response['gimage'],
        //"items": this.offers,
        "items": [
          {
            "id": 1,
            "title": this.packages.experience_name,
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
            "title": this.packages.experience_name,
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
    console.log('ionViewDidLoad LuxuryPackagePage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  rentalForm() {
    // this.navCtrl.push('LuxuryPaymentPage', {
    //   price: this.packages.price,
    //   exp_id: this.packages.experience_id
    // });
    this.ticket = this.formBuilder.group({
      email: [localStorage.getItem('username')],
      amount: [this.packages.price],
      currency: [this.packages.curr],
      customer_id: [localStorage.getItem('customer_id')],
      experience_id: [this.packages.experience_id]

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
             
              let url = this.api + 'customer_luxury';
              this.data = this.http.post(url, this.ticket.value);
              this.data.subscribe(response => {
                if (response['error'] == false) {
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

}