import { Component, ChangeDetectorRef, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
/**
 * Generated class for the UpgradePlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-upgrade-plan',
  templateUrl: 'upgrade-plan.html',
})
export class UpgradePlanPage {
  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  customer_id:any;
  email:any;
  subscription: any;
  member: any;
  api:string;
  public form: FormGroup;
  public ticket:FormGroup

  membership = ['Essence', 'Luxe', 'Premium'];
  planByMembership = {
    Essence: ['Essence_Monthly', 'Essence_Yearly'],
    Luxe: ['Luxe_Monthly', 'Luxe_Yearly'],
    Premium: ['Premium_Monthly', 'Premium_Yearly'],
  };
  priceByMembership = {
    Essence_Monthly: '1000', 
    Essence_Yearly: '10000',
    Luxe_Monthly: '20000',
    Luxe_Yearly: '200000',
    Premium_Monthly: '5000',
    Premium_Yearly: '50000'
    
  };
  
 price = '';
 packages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: HttpClient, private formBuilder: FormBuilder, private alertCtrl: AlertController, private _cdr: ChangeDetectorRef, private inAppBrowser: InAppBrowser) {
    this.customer_id = localStorage.getItem('customer_id');
    this.email = localStorage.getItem('username');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.api = AppSettings.API_ENDPOINT;
    this.subscription = JSON.parse(localStorage.getItem('subscription') || null);
    // this.membership = localStorage.getItem('membership');
    this.member = this.subscription.membership;

    this.data = {
      'headerTitle': 'Upgrade Plan',
      'oldplan': this.member
    }

    this.form = this.formBuilder.group({
      membership: ['', Validators.required],
      price: ['', Validators.required],
      packages:['', Validators.required]
    });
  }

  onMemberChange(): void {
    let membership = this.form.get('membership').value;
    this.packages = this.planByMembership[membership];
    this.price = '';
    this._cdr.detectChanges();
  }

  onPlanChange(): void {
    let packages = this.form.get('packages').value;
    this.price = this.priceByMembership[packages];
    this._cdr.detectChanges();
  }

  onSubmit() {

    let membership = this.form.get('membership').value;
    let price = this.form.get('price').value;
    let plans = this.form.get('packages').value;

    if (membership == 'Essence' && plans == 'Essence_Monthly') {
        this.ticket = this.formBuilder.group({
        
          amount: [price],
          membership: [membership],
          plans: [plans],
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
               
                let url = this.api + 'change_plan';
                this.data = this.http.post(url, this.ticket.value);
                this.data.subscribe(response => {
                  if (response['error'] == false) {
                    loader.dismiss();
                    this.subscription = response['subscription'];
                    console.log(this.subscription);
                    window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                    
  
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
            
          amount: [price],
          membership: [membership],
          plans: [plans],
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
              
                let url = this.api + 'change_plan';
                this.data = this.http.post(url, this.ticket.value);
                this.data.subscribe(response => {
                  if (response['error'] == false) {
                    loader.dismiss();
                    this.subscription = response['subscription'];
                    console.log(this.subscription);
                    window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                  
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
    else if (membership == 'Premium' && plans == 'Premium_Monthly') {
      this.ticket = this.formBuilder.group({
            
        amount: [price],
        membership: [membership],
        plans: [plans],
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
            
              let url = this.api + 'change_plan';
              this.data = this.http.post(url, this.ticket.value);
              this.data.subscribe(response => {
                if (response['error'] == false) {
                  loader.dismiss();
                  this.subscription = response['subscription'];
                  console.log(this.subscription);
                  window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                
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
    else if (membership == 'Premium' && plans == 'Premium_Yearly') {
      this.ticket = this.formBuilder.group({
            
        amount: [price],
        membership: [membership],
        plans: [plans],
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
            
              let url = this.api + 'change_plan';
              this.data = this.http.post(url, this.ticket.value);
              this.data.subscribe(response => {
                if (response['error'] == false) {
                  loader.dismiss();
                  this.subscription = response['subscription'];
                  console.log(this.subscription);
                  window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                
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
    else if (membership == 'Luxe' && plans == 'Luxe_Monthly') {
      this.ticket = this.formBuilder.group({
            
        amount: [price],
        membership: [membership],
        plans: [plans],
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
              
                let url = this.api + 'change_plan';
                this.data = this.http.post(url, this.ticket.value);
                this.data.subscribe(response => {
                  if (response['error'] == false) {
                    loader.dismiss();
                    this.subscription = response['subscription'];
                    console.log(this.subscription);
                    window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                  
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
    else if (membership == 'Luxe' && plans == 'Luxe_Yearly') {
      this.ticket = this.formBuilder.group({
            
        amount: [price],
        membership: [membership],
        plans: [plans],
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
            
              let url = this.api + 'change_plan';
              this.data = this.http.post(url, this.ticket.value);
              this.data.subscribe(response => {
                if (response['error'] == false) {
                  loader.dismiss();
                  this.subscription = response['subscription'];
                  console.log(this.subscription);
                  window.localStorage.setItem('subscription', JSON.stringify(response['subscription']));
                
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

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradePlanPage');
  }

}
