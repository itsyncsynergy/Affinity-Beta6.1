import { Component, ChangeDetectorRef, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
/**
 * Generated class for the RenewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-renew',
  templateUrl: 'renew.html',
})
export class RenewPage {

  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  api:string;
  sub_details:any;
  membership:any;
  customer_id: any;
  email:any;
  subscription:any;
  public ticket: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private inAppBrowser: InAppBrowser, public http: HttpClient, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    console.log(navParams.data.customer_id);
    this.customer_id = localStorage.getItem('customer_id');
    
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.api = AppSettings.API_ENDPOINT;
    this.email = localStorage.getItem('username');
    this.showLoading()

    this.customerService.getList('sub_details/' + navParams.data.customer_id).subscribe(response => {
      this.sub_details = response['subscription']; 

      localStorage.setItem('subscription', JSON.stringify(response['subscription']));
  
        this.data = {

          "headerTitle": "Renew Plan",
          "membership": this.sub_details.membership,
          "period": this.sub_details.Period,
          "amount": this.sub_details.amount,
          "expiry_date": this.sub_details.expiry_message

        }
      this.loading.dismiss();
    })

  }

  Renew() {

    this.ticket = this.formBuilder.group({
      
      amount: [this.sub_details.amount],
      membership: [this.sub_details.membership],
      plans: [this.sub_details.Period],
      customer_id: [this.navParams.data.customer_id],
      email: [this.email],
    
    })

    let membership = this.ticket.get('membership').value;
    let plans = this.ticket.get('plans').value;

    if (membership == 'Essence' && plans == 'Monthly') {
        this.ticket = this.formBuilder.group({
        
          amount: [this.sub_details.amount],
          membership: [this.sub_details.membership],
          plans: [this.sub_details.Period],
          plan:['PLN_eaydien24t4uui4'],
          customer_id: [this.navParams.data.customer_id],
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
                
                  let url = this.api + 'renew_plan';
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
    else if (membership == 'Essence' && plans == 'Yearly') {
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
              
                let url = this.api + 'renew_plan';
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
    else if (membership == 'Premium' && plans == 'Monthly') {
      this.ticket = this.formBuilder.group({

        amount: [this.navParams.data.price],
        membership: [this.navParams.data.membership],
        plans: [this.navParams.data.plan],
        plan:['PLN_4e4blzm2nnv23sf'],
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
              
                let url = this.api + 'renew_plan';
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
    else if (membership == 'Premium' && plans == 'Yearly') {
      this.ticket = this.formBuilder.group({

        amount: [this.navParams.data.price],
        membership: [this.navParams.data.membership],
        plans: [this.navParams.data.plan],
        plan:['PLN_dcp4tpd4mpeg5ms'],
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
              
                let url = this.api + 'renew_plan';
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
    else if  (membership == 'Luxe' && plans == 'Monthly') {
      this.ticket = this.formBuilder.group({

        amount: [this.navParams.data.price],
        membership: [this.navParams.data.membership],
        plans: [this.navParams.data.plan],
        plan:['PLN_czvcliv44oe30er'],
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
              
                let url = this.api + 'renew_plan';
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
    else if (membership == 'Luxe' && plans == 'Yearly') {
      this.ticket = this.formBuilder.group({

        amount: [this.navParams.data.price],
        membership: [this.navParams.data.membership],
        plans: [this.navParams.data.plan],
        plan:['PLN_9uzzay5rdlw53cc'],
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
              
                let url = this.api + 'renew_plan';
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  presentFilter() {
    
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RenewPage');
  }

}
