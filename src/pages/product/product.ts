import { Component,Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, AlertController  } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  params: any = {};
  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  product: any;
  gallery: any;
  headerImage: string;
  api:string;

  public ticket: FormGroup


  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public storage: Storage, private inAppBrowser: InAppBrowser, public ht:Http) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.api = AppSettings.API_ENDPOINT;
      let items = [];
      this.showLoading()
      console.log(navParams.data.id);
      this.customerService.getList('product/' + navParams.data.id).subscribe(response => {
        
        
        this.product = response['product'];
        this.gallery = response['gallery'];
        this.headerImage = this.product.avatar;
        console.log(response);
        this.data = {
          "avatar": this.product.avatar,
          "headerImage": this.product.headerImage,
          "headerTitle": this.product.name,
          "details": this.product.details,
          "category": navParams.data.cate_title,
          "title": this.product.name,
          "price": this.product.price,
          "curr": this.product.curr,
          'supplier_name': this.product.supplier_name,
          "gallery": this.gallery,
          "base_url": this.base_url,
          "gimage": response['gimage'],
         
        }

        this.loading.dismiss();
       
      })

    this.params.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
      },
    };
  }

  buy(){

    // this.navCtrl.push('PaystackPage',{
    //   id: this.navParams.data.id,
    //   price: this.product.price
    // })
    this.ticket = this.formBuilder.group({
      product_id: [this.navParams.data.id],
      email: [localStorage.getItem('username')],
      customer_id: [localStorage.getItem('customer_id')],
      amount: [this.product.price],
      currency: [this.product.curr]
    })

    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
    });
    loader.present();
    var  headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer sk_test_ae4057f7343a3021a27a83230d6d300ede1575f3'

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
              let url = this.api + 'bespoke_product_request';
              this.data = this.http.post(url, this.ticket.value);

              this.data.subscribe(response => {
                if (response['error'] == false) {
                  loader.dismiss();
                   let alert = this.alertCtrl.create({
                      title: 'Message',
                      message: '<p class="emoji-text">Thank you for your purchase. A member of our Sales team will be in touch shortly.</p>',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
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

}
