import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, ViewController, MenuController, Loading, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/authservice';

/**
 * Generated class for the VerifyEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-email',
  templateUrl: 'verify-email.html',
})
export class VerifyEmailPage {

  text: string;

  data: any;
  events: any;
  user: any;
  token: any;
  redemption: any;
  interest: any;
  activities: any;
  subscription: any;

  customer: any;

  details: any;
  //email: string;

  usercreds = {
    email: '',
    code: ''
  };
  HAS_LOGGED_IN = 'hasLoggedIn';

  loading: Loading;

  public email: string;
  public code: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    public menu: MenuController,
    public storage: Storage,
    public authservice: AuthService,
    private event: Events) {
    this.email = this.navParams.data.email;
    console.log(this.email);
    console.log('Hello ForgotLayoutComponent Component');
    this.text = 'Hello World';
    this.data = {
      "background": "assets/images/background/32.jpg",
      "username": "Enter your email",
      "password": "Enter your password",
      "labelVerificationCode": "Verification Code",
      "labelPassword": "PASSWORD",
      "register": "Register now!",
      "forgotPassword": "Verify Email",
      "submit": "SUBMIT",
      "subtitle": "Welcome",
      "title": "Verify Email",
      "skip": "Skip",
      "logo": "assets/images/logo/affinity.png",
      "errorUser": "Opss! You forgot your email?",
      "errorPassword": "O! We would need your password.",
      "phone": "Phone",
      "labelphone": "",
      "email": this.email
    }
    this.events = {
      
      onForgot: function () {
        console.log('onForgot:');
        let forgotModal = this.modalCtrl.create('ForgotPage');
        forgotModal.present();
      },
      onRegister: function (params) {
        //move to the signuo page
        this.navCtrl.push('SignupPage');
      },
      onSkip: function (params) {
        console.log('onSkip:');
      },
      onFacebook: function (params) {
        console.log('onFacebook:');
      }
    };
  }

  onSubmit() {
    this.menu.enable(false);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authservice.verification(this.usercreds).subscribe(response => { 
        console.log('got here 909')
        console.log("response is" + response);
        if (!response['error']) {
            if (response['response'] == 'error') {
              console.log("Wrong Credentials");
              this.showError(response['message']);
              loading.dismiss();
              return;
                
            } else {
                //User login successfully...
                console.log("Verified");
                //redirect to membership option page
              //User login successfully...
              console.log("Successfully Logged in");
              console.log(response['user'].group_id)
              this.user = response['user'];
              this.token = response['token'];
              this.redemption = response['redemption'];
              this.interest = response['interest'];
              this.activities = response['activities'];
              this.subscription = response['subscription'];


              if (this.isCustomer(this.user.group_id)) {
                // Its a Customer's Profile.. therefore redirect
                console.log("Its a Customer's Profile");

                /*this.getDetails(this.user.details_id);*/
                this.customer = this.user;
                localStorage.setItem('customer', JSON.stringify(this.customer));
                console.log("login" + this.customer);

                window.localStorage.setItem('membership', this.customer.membership);
                window.localStorage.setItem('avatar', this.customer.avatar);
                window.localStorage.setItem('firstname', this.customer.firstname);
                window.localStorage.setItem('lastname', this.customer.lastname);
                window.localStorage.setItem('loggedIn', "true");
                window.localStorage.setItem('user', this.user);
                window.localStorage.setItem('customer_id', this.user.details_id);
                window.localStorage.setItem('username', this.user.username);
                window.localStorage.setItem('token', this.token);

                //set the other variables
                window.localStorage.setItem('redemption', JSON.stringify(this.redemption));
                window.localStorage.setItem('interest', JSON.stringify(this.interest));
                window.localStorage.setItem('activities', JSON.stringify(this.activities));
                window.localStorage.setItem('subscription', JSON.stringify(this.subscription));

                this.event.publish('user:signedIn', this.customer);
                this.enableMenu(true);
                this.storage.set(this.HAS_LOGGED_IN, true);
                loading.dismiss();
                this.navCtrl.setRoot('MembershipOptionPage');
                //give notification for successful verification
                return;
                //this.rootPage = Dashboard;
              }
              else {
                // Not a Customer's Profile
                console.log("Not a Customer's Profile");
                this.showError("Only Customers can use this Application");

              }
              
        

            }
            

        }
        else {
            // User not logged in... Wrong credentials
            console.log(response);
            console.log("Wrong Credentials");
            this.showError("Wrong Credentials");
            loading.dismiss();
            return;
        }
        console.log("Wrong Credentials");
        this.showError("Something went wrong. Try again");
        loading.dismiss();
        return;
      }
    );

  }

  onEvent = (event: string): void => {
    if (event == "onLogin" && !this.validate()) {
      return;
    }
    if (this.events[event]) {
      this.events[event]({
        'username': this.email,
        'password': this.code
      });
    }
  }

  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if (!this.email || this.email.length == 0) {
      this.isUsernameValid = false;
    }

    if (!this.code || this.code.length == 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      //title: 'Login Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyEmailPage');
  }

  isCustomer(group_id) {
    console.log("Group id " + group_id);

    if (group_id == 1) {
      return true;
    }

  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
  }

}
