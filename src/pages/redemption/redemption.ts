import { Component, Input, ViewChild, Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController, Platform, Events, FabContainer, ItemSliding, Refresher, ToastController, List, ModalController } from 'ionic-angular';
import { IOffer } from '../../interfaces/ioffer';
import { IMerchant } from '../../interfaces/imerchant';
import { MerchantService } from '../../services/merchant.service';
import { TransactionService } from '../../services/transaction.service';
import { CustomerService } from '../../services/customer.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SelectSearchableComponent } from 'ionic-select-searchable';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { AppSettings } from '../../app/appSettings';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the RedemptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  
  selector: 'page-redemption',
  templateUrl: 'redemption.html',
})



export class RedemptionPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  data: any = {};
  //events: any = {};
  loading: Loading;

  pin: any;

  all_merchants: any;

  offer_details: any;

  transaction: any;

  transactionHistory: any;

  //offers: IOffer;
  offers: Offers[];
  offer: Offers;

  merchant: IMerchant;

  merchant_name: String;

  message: any;

  name: string;

  scanned: any;

  today: number;

  totalAmount: number;

  discountedTotal: number;

  amount_payable: any;

  amount: any;

  valid: boolean;

  searchMerchantString = '';

  merchantInitial = [];

  merchants: any;

  firstname: String;

  hide: false;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  verification_pin: number;
  base_url: any = "";
  searchTerm: any = "";
  allItems: any;
  user_image_link: any;

  ports: Port[];
  port: Port;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private platform: Platform,
    private merchantService: MerchantService, private transactionService: TransactionService, private customerService: CustomerService, private events: Events, public toastCtrl: ToastController, public confData: ConferenceData,
    public user: UserData, public modalCtrl: ModalController, private inAppBrowser: InAppBrowser, public http: HttpClient) {
    
      this.base_url = AppSettings.BASE_URL;
      this.user_image_link = this.base_url + localStorage.getItem('avatar');
      
    this.data = {
      "confirmPassword": "Confirm Password",
      "country": "Select Country",
      "email": "Email Address",
      "lableConfirmPassword": "",
      "lableCountry": "",
      "lableEmail": "",
      "lablePassword": "",
      "lableUsername": "",
      "logo": "assets/images/logo/2.png",
      "password": "Password",
      "register": "Redeem Offer",
      "skip": "Skip",
      "title": "Redeem Offer",
      "toolbarTitle": "Redeem Offer",
      "purchase_amount": "Purchase Amount",
      "merchant": "Merchant",
      "select_offer": "Select Offer",
      "to_be_paid": "Amount To Be Paid",
      "errorName": "We would need your Name",
      "errorEmail": "Please provide your Email",
      "errorCode": "Required",
      "errorPhone": "Required",
      "errorPassword": "Required",
      "errorConfirmPassword": "Must Match Password",
      "customer_id": window.localStorage.getItem('customer_id')

    }
    this.merchantService.getMerchants().subscribe(response => {
      if (!response.error) {      
        this.ports = response
      }
      else {

        console.log(response);
        this.showMessage("Error Persisting");
      }
    });

    
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedemptionPage');
  }
  createViews(offer, nav) {
    this.merchant_name = offer;
    this.hide = nav;
    this.getMerchantInfo();
    console.log(this.merchant_name);
  }



  
  redemption() {
    this.navCtrl.setRoot(RedemptionPage);
  }


  ngOnInit() {
    this.getTransactions();
    this.getAllMerchants();
    this.transaction = {
      customer_id: window.localStorage.getItem('customer_id'),
      email: window.localStorage.getItem('username'),
      merchant_id: '',
      amount: '',
      remarks: '',
      search_merchant: '',



    };

    this.valid = false;

    this.today = Date.now();

    this.name = window.localStorage.getItem('customer_name');

    console.log(name);


  }

  showVerifyForm() {

    document.getElementById('claim1').style.display = "none";
    document.getElementById('claim2').style.display = "block";
  }

  showPin() {
    this.loading.dismiss();

    document.getElementById('pin').style.display = "block";
  }

  trackTransaction(transaction) {

    this.valid = false;

    this.showLoading();

    // Confirm if merchant ID is valid

    this.merchantService.getMerchantDetails(transaction.merchant_id).subscribe(response => {
      console.log(response);

      if (!response.error) {
        // this.showMessage("Merchant Valid");

        this.merchantInitial = response.merchant;
        this.merchant = response.merchant;

        this.showVerifyForm();
      }
      else {
        console.log("Else reached");
        this.showMessage("Merchant Not Valid");
        this.loading.dismiss();
      }

    });

  }

  verifyUserValidity() {
    if (!this.transaction.customer_id || !this.transaction.offer_id || !this.transaction.merchant_id) {
      this.showMessage('Please fill all mandatory fields');
      return;
    }
    this.showLoading();
    this.customerService.verifyUserValidity(this.transaction.customer_id, this.transaction.offer_id).subscribe(response => {
      console.log(response);

      if (response.error) {
        this.loading.dismiss();
        this.message = response.message;
        if (response.code == 101) {
          //redirect to upgrade subscription
          this.showMessage(this.message);
        }
        else if(response.code == 100) {
          //redirect to renew subscription
          this.message = 'Dear ' + localStorage.getItem('firstname') + ', your subscription has expired. Kindly renew to redeem your offer';
          this.showMessage(this.message);
        }else if(response.code == 404){
          //redirect to new subscription
          this.showMessage(this.message);
        }

        

      }
      else {
        this.verification_pin = response.verification_pin;
        this.loading.dismiss();
        this.showVerifyForm();

      }

    });

  }

  searchMerchants(searchbar) {
    // reset countries list with initial call
    this.merchants = this.merchantInitial;
    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.merchants = this.merchants.filter((v) => {
      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  calculateAmountPayable(offer_id, amount) {
    console.log(offer_id);
    if (offer_id === null) {
      return;
    }
    if (amount === null) {
      return;
    }

    this.transactionService.getOfferDetails(offer_id).subscribe(response => {
      

      if (!response.error) {
        this.offer_details = response;
        console.log(this.offer_details);
        if (!isNaN(+('' + this.offer_details.offer_name))) {
          console.log(this.offer_details.offer_name);
          this.amount = this.offer_details.amount;
          console.log(this.amount);
          if (this.offer_details.offer_type == 'Percentage discount') {
            this.amount_payable = (this.offer_details.offer_name * this.offer_details.amount) / 100;
          }else if (this.offer_details.offer_type == 'Amount discount') {
            this.amount_payable = this.offer_details.amount - this.offer_details.offer_name;
          }else {
            this.amount_payable = this.offer_details.amount;
          }
          
          this.transaction.amount_payable = this.amount_payable;
          this.transaction.amount = this.amount;
          this.transaction.transaction_type = this.offer_details.tagline;
          this.transaction.offer = this.offer_details.offer_name;
          //this.showMessage("Amount Payable is " + this.amount_payable);
        }
        else {
          this.transaction.amount_payable = amount;
        }

      }
      else {

        console.log(response);
        this.showMessage("Error Persisting");
      }


    });
  }
  verifyTransaction() {
    

    console.log("Verification method called");

    console.log("Enteered Pin : " + this.pin);

    console.log(this.merchant);

    var enteredPin = this.pin;


    if (enteredPin == this.verification_pin) {
      console.log("Equal");
      // Equal.. persist database...
      console.log(this.transaction);

                this.transactionService.postTransaction(this.transaction).subscribe(response => {
                  if (response['error'] == false) {
                    // Record Added Successfully...
                    // this.showMessage(response.message);
                    window.localStorage.setItem('redemption', JSON.stringify(response['redemption']));
                    let alert = this.alertCtrl.create({
                      message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">You have successfully redeemed an offer at the' + this.merchant_name + 'Enjoy!</p>',
                      buttons: [{
                        text: 'OK',
                        handler: () => {
                          console.log('button pressed');
                         
          
                          if (response['error'] == false) {
                            document.getElementById('claim3').style.display = "block";
                          }
                          else {
                            document.getElementById('claim1').style.display = "block";
                            // this.showMessage(response.message);
                          } 
                        }
                      }] 
                    });
                    alert.present();
                    this.pin = "";
                    this.loading.dismiss();
          
                    document.getElementById('claim2').style.display = "none";
          
                  }
                  else {
                    // Error persisting transaction...
                    this.pin = "";
                    console.log("Error Persisting");
                    this.showMessage("Error Persisting");
                  }
          
                });

      // this.transactionService.postTransaction(this.transaction).subscribe(response => {
      //   if (!response.error) {
      //     // Record Added Successfully...
      //     this.showMessage(response.message);
      //     this.pin = "";
      //     this.loading.dismiss();

      //     document.getElementById('claim2').style.display = "none";

      //     if (response.message == "Transaction is successful") {
      //       document.getElementById('claim3').style.display = "block";
      //     }
      //     else {
      //       document.getElementById('claim1').style.display = "block";
      //       this.showMessage(response.message);
      //     }

      //   }
      //   else {
      //     // Error persisting transaction...
      //     this.pin = "";
      //     console.log("Error Persisting");
      //     this.showMessage("Error Persisting");
      //   }

      // });

    } else {
      console.log("Not Equal");
      this.showMessage("Incorrect Merchant PIN, please check and try again");
    }

  }

  submitClaim() {
   
    this.transactionService.postTransaction(this.transaction).subscribe(response => {
      if (response['error'] == false) {
        // Record Added Successfully...
        // this.showMessage(response.message);
        window.localStorage.setItem('redemption', JSON.stringify(response['redemption']));
        let alert = this.alertCtrl.create({
          message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">You have successfully redeemed an offer at the' + this.merchant_name + 'Enjoy!</p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              console.log('button pressed');

              if (response['error'] == false) {
                document.getElementById('claim3').style.display = "block";
              }
              else {
                document.getElementById('claim1').style.display = "block";
                // this.showMessage(response.message);
              } 
            }
          }] 
        });
        alert.present();
        this.pin = "";
        this.loading.dismiss();

        document.getElementById('claim2').style.display = "none";

        

      }
      else {
        // Error persisting transaction...
        this.pin = "";
        console.log("Error Persisting");
        this.showMessage("Error Persisting");
      }

    });
  }

  cancelVerification() {
    document.getElementById('claim1').style.display = "block";
    document.getElementById('claim2').style.display = "none";
  }

  claimHide() {
    if (document.getElementById('claim2').innerHTML != null) {
      document.getElementById('claim2').style.display = "none";
    }
    if (document.getElementById('claim3').innerHTML != null) {
      document.getElementById('claim3').style.display = "none";
    }

  }
  historyHide() {
    if (document.getElementById('claim2').innerHTML != null) {
      document.getElementById('claim2').style.display = "none";
    }
    if (document.getElementById('claim3').innerHTML != null) {
      document.getElementById('claim3').style.display = "none";
    }

  }

  cancelVerification1() {
    document.getElementById('claim1').style.display = "block";
    document.getElementById('claim2').style.display = "none";
    document.getElementById('claim3').style.display = "none";
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  showClaim1() {
    this.cancelVerification();
    document.getElementById('claim1').style.display = "block";
  }
  showInput() {
    document.getElementById('merchant-input').style.display = "block";
  }

  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/

    let alert = this.alertCtrl.create({
      title: 'Redeem Offer',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  getAllMerchants() {
    
    this.merchantService.getMerchants().subscribe(response => {
      this.all_merchants = (response.merchants);
    });
  }

  getMerchantInfo() {
    console.log('here')
    this.merchantService.getMerchantDetails(this.merchant_name).subscribe(response => {
      console.log("merchant details received");
      console.log(response);

      if (!response.error) {
        if (!response.merchant) {
          return;
        }
        this.merchant = response.merchant;
        this.merchant_name = this.merchant.name;
        this.transaction.merchant_id = this.merchant.merchant_id;
        //this.getMerchantOffers();
      } else {
        console.log("Else reached");
        this.showMessage("Merchant Not Valid");

      }

    });
  }

  getMerchantOffers(merchant_id) {
    if (!merchant_id) {
      return;
    }
    
    this.merchantService.getMerchantOffers(merchant_id).subscribe(response => {
      
      console.log(response);

      if (!response.error) {
        this.offers = response;

      } else {
        console.log("Else reached");
        this.showMessage("");

      }

    });
  }
  submitRating(rate, remarks, merchant_id) {
    this.showLoading();
    console.log(rate);
    console.log(merchant_id);
    console.log(this.transaction.customer_id);
    var rating = rate * 20;
    var rating_data = { rating: rating, remarks: remarks, merchant_id: merchant_id, customer_id: this.transaction.customer_id };
    this.transactionService.postRating(rating_data).subscribe(response => {
      if (!response.error) {
        // Record Added Successfully...
        this.loading.dismiss();
        this.showMessage(response.message);


        document.getElementById('claim2').style.display = "none";
        document.getElementById('claim3').style.display = "block";
        this.navCtrl.setRoot('RedemptionPage');
      }
      else {
        // Error persisting transaction...

        console.log("Error Persisting");
        this.showMessage("Error Persisting");
      }

    });


  }

  getTransactions() {
    this.transactionService.getTransactions(window.localStorage.getItem('customer_id')).subscribe(response => {
      this.transactionHistory = response.transactions;
      console.log(response.transactions);
      let total = 0;
      let discountedAmount = 0;
      for (var i = 0; i < this.transactionHistory.length; i++) {


        if (this.transactionHistory[i].amount) {
          total += this.transactionHistory[i].amount * 1;
          discountedAmount += this.transactionHistory[i].amount - this.transactionHistory[i].amount * (this.transactionHistory[i].offer / 100);
          this.totalAmount = total;
          this.discountedTotal = discountedAmount;
        }
      }
    });

  }

  scanQR() {

    this.platform.ready().then(() => {
      this.barcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
        this.scanned = barcodeData.text;
        if (this.transaction.merchant_id == this.scanned) {
          this.submitClaim();
        }
        else {
          this.showMessage("Error! This scanned code does not match selected vendor");
          return;
        }
        //this.getMerchantInfo();
        //retrieve merchant information after we see barcode
        //this.getMerchantInfo();
      }, (err) => {
        // An error occurred
        console.log(err);
      });
    });

  }
  

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage', this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        //this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push('SessionDetailPage', { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            //this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
  logout() {
    console.log('Am in here');
    localStorage.clear();
    this.navCtrl.setRoot('WelcomeWizardPage');
  }
  portChange(event: {
    component: SelectSearchableComponent,
    value: any
  }) {
    this.getMerchantOffers(event.value.id);
    console.log('port:', event.value.id);
  }

}
class Port {
  public id: string;
  public name: string;
};

class Offers {
  public merchant_id: string;
  public offer_id: number;
  public name: string;
  public details: string;
  public tagline: string;
  public period: string;
  public city: string;
};
