import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading, ModalController, AlertController, LoadingController} from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";


/**
 * Generated class for the VolunteerSinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-volunteer-single',
  templateUrl: 'volunteer-single.html',
})
export class VolunteerSinglePage {


  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  volunteer: any;
  email:any;
  
  headerImage: string;

  params: any = {}
  public form: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private inAppBrowser: InAppBrowser, public http: HttpClient, private formBuilder: FormBuilder) {
    this.base_url = AppSettings.BASE_URL; 
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    console.log(navParams.data.id)
    this.email = localStorage.getItem('username');
    this.showLoading()

    this.customerService.getList('volunteer/' + navParams.data.id).subscribe(response => {


      this.volunteer = response;
      // this.headerImage = this.volunteer.avatar;
      console.log(response);
      this.data = {
        "headerTitle": this.volunteer.title,
        "headerImage": this.volunteer.avatar,
        "details": this.volunteer.post,
        "title": this.volunteer.title,
        "Type": this.volunteer.fee,
        "price": this.volunteer.price,
        'address': this.volunteer.state + ", " + this.volunteer.country,  
      }

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
    console.log('ionViewDidLoad VolunteerSinglePage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  Volunteer(){

    this.form = this.formBuilder.group({
      
      amount: [this.volunteer.price],
      email: [this.email],
    
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
    this.data = this.http.post(url, this.form.value, { headers: headers });
    this.data.subscribe(data => {
      if (data['status'] == true){
        const browser = this.inAppBrowser.create(data.data.authorization_url, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=DONE');
        browser.on('exit').subscribe(()=> {
          var url = 'https://api.paystack.co/transaction/verify/' + data.data.reference;
          this.data = this.http.get(url, { headers: headers });
          this.data.subscribe(data => {
            if (data.data.status == 'success') {
              let alert = this.alertCtrl.create({
                title: 'Message',
                message: 'Thanks For Volunteering',
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }] 
              });
              alert.present();
            }
          })
        })
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

}
