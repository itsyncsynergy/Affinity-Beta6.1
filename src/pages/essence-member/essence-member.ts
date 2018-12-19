import { Component, ChangeDetectorRef, Injectable  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the EssenceMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-essence-member',
  templateUrl: 'essence-member.html',
})
export class EssenceMemberPage {
  data:any;
  loading: Loading;
  base_url: any = ""
  api:string;
  user_image_link: any;
  customer_id:any;
  email:any;
  subscription:any;
  public ticket: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: HttpClient, private formBuilder: FormBuilder, private alertCtrl: AlertController, private _cdr: ChangeDetectorRef, private inAppBrowser: InAppBrowser) {
    this.api = AppSettings.API_ENDPOINT;
    this.customer_id = localStorage.getItem('customer_id');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.email = localStorage.getItem('username');
    console.log(navParams.data.membership);
    console.log(navParams.data.plan);
    console.log(navParams.data.price);

    this.data = {
      'headerTitle': 'Essence Members',
      'price': navParams.data.price
    }
  }

  pay(){
    this.ticket = this.formBuilder.group({
      
      amount: [this.navParams.data.price],
      membership: [this.navParams.data.membership],
      plans: [this.navParams.data.plan],
      // plan:[''],
      customer_id: [this.customer_id],
      email: [this.email],
    

    })

    let membership = this.ticket.get('membership').value;
    let plans = this.ticket.get('plans').value;

    if (membership == 'Essence' && plans == 'Essence_Monthly') {
        this.ticket = this.formBuilder.group({
        
          amount: [this.navParams.data.price],
          membership: [this.navParams.data.membership],
          plans: [this.navParams.data.plan],
          plan:['PLN_eaydien24t4uui4'],
          customer_id: [this.customer_id],
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
        this.data = this.http.post(url, this.ticket.value, { headers: headers });
        this.data.subscribe(data => {
          if (data['status'] == true){
            const browser = this.inAppBrowser.create(data.data.authorization_url, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=DONE');

            browser.on('exit').subscribe(()=> {
              console.log('Exit button');
              var url = 'https://api.paystack.co/transaction/verify/' + data.data.reference;
              this.data = this.http.get(url, { headers: headers });
              this.data.subscribe(data => {
                if (data.data.status == 'success') {
                 
                  let url = this.api + 'subscription';
                  this.data = this.http.post(url, this.ticket.value);
                  this.data.subscribe(response => {
                    if (response['error'] == false) {
                      loader.dismiss();
                      this.subscription = response['subscription'];
                      console.log(this.subscription);
                      window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                      window.localStorage.setItem('membership', JSON.stringify(this.subscription.membership));
    
                      let alert = this.alertCtrl.create({
                        message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">Your subscription payment was successful. Thank you for being awesome.</p>',
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
                  
                } else if (data.data.status == "failed") {
                    let alert = this.alertCtrl.create({
                      message: '<img src="assets/images/smileys/sad.png" class="emoji-align" />',
                      buttons: [{
                        text: 'OK',
                        handler: () => {
                          this.navCtrl.pop();
                        }
                      }] 
                    });
                    alert.present();
                }
              });

            })
          }
        
                 
        });


      console.log(this.ticket.value)
    }
    else if (membership == 'Essence' && plans == 'Essence_Yearly') {
      this.ticket = this.formBuilder.group({

        amount: [this.navParams.data.price],
        membership: [this.navParams.data.membership],
        plans: [this.navParams.data.plan],
        plan:['PLN_9b3wwtfkrbsn663'],
        customer_id: [this.customer_id],
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
      this.data = this.http.post(url, this.ticket.value, { headers: headers });
      this.data.subscribe(data => {
        if (data['status'] == true){
          const browser = this.inAppBrowser.create(data.data.authorization_url, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=DONE');

          browser.on('exit').subscribe(()=> {
            console.log('Exit button');
            var url = 'https://api.paystack.co/transaction/verify/' + data.data.reference;
            this.data = this.http.get(url, { headers: headers });
            this.data.subscribe(data => {
              if (data.data.status == 'success') {
               
                let url = this.api + 'subscription';
                this.data = this.http.post(url, this.ticket.value);
                this.data.subscribe(response => {
                  if (response['error'] == false) {
                    loader.dismiss();
                    this.subscription = response['subscription'];
                    console.log(this.subscription);
                    window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                    window.localStorage.setItem('membership', JSON.stringify(this.subscription.membership));
  
                    let alert = this.alertCtrl.create({
                      message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">Your subscription payment was successful. Thank you for being awesome.</p>',
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
                
              } else if (data.data.status == "failed") {
                  let alert = this.alertCtrl.create({
                    message: '<img src="assets/images/smileys/sad.png" class="emoji-align" />',
                    buttons: [{
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }] 
                  });
                  alert.present();
              }
            });

          })
        }
      
               
      });
      console.log(this.ticket.value)

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EssenceMemberPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}
