import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams, AlertController, LoadingController, Loading, Events, ModalController, IonicPage } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { AuthService } from "../../services/authservice";
import { CustomerService } from "../../services/customer.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  params: any = {}

  loading: Loading;



  user: any;

  customer: any;

  details: any;

  usercreds = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public userData: UserData,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public authservice: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private customerService: CustomerService,
    private events: Events ) {
      this.params.data = {
        "background": "assets/images/background/32.jpg",
        "username": "Email Address",
        "password": "Password",
        "labelUsername": "",
        "labelPassword": "",
        "register": "Register now!",
        "forgotPassword": "Forgot password?",
        "login": "Login",
        "subtitle": "Welcome",
        "title": "Hello, welcome back!",
        "skip": "Skip",
        "logo": "assets/images/logo/affinity.png",
        "errorUser": "Opss! You forgot your email?",
        "errorPassword": "O! We would need your password.",
        "phone": "Phone",
        "labelphone": "",
        "rememberme": "Remeber Me"
      }
      this.params.events = {
        onLogin: function (user) {
          //this.showLoading();
          console.log(user);
          this.showLoading();
          this.authservice.authenticate(user).subscribe(response => {
            console.log("response is" + response);
            if (!response['error']) {
              //User login successfully...
              console.log("Successfully Logged in");
              this.user = response['user'];

              if (this.isCustomer(this.user.group_id)) {
                // Its a Customer's Profile.. therefore redirect
                console.log("Its a Customer's Profile");

                /*this.getDetails(this.user.details_id);*/

                this.customerService.getCustomerDetails(this.user.details_id).subscribe(response => {
                  this.customer = response.customer;
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
                  window.localStorage.setItem('phone', this.user.phone);

                  this.events.publish('user:signedIn', this.customer);

                  console.log(response.customer);
                  console.log(JSON.stringify(this.customer));

                });

                this.loading.dismiss();
                this.navCtrl.setRoot("DashboardPage");

                //this.rootPage = Dashboard;
              }
              else {
                // Not a Customer's Profile
                console.log("Not a Customer's Profile");
                this.showError("Only Customers can use this Application");

              }

            }
            else {
              // User not logged in... Wrong credentials
              console.log(response);
              console.log("Wrong Credentials");
              this.showError("Wrong Credentials");
            }

          });
        },
        onForgot: function () {
          console.log('onForgot:');
          let forgotModal = this.modalCtrl.create("ForgotPage");
          forgotModal.present();
        },
        onRegister: function (params) {
          //move to the signuo page
          this.navCtrl.push("SignupPage");
        },
        onSkip: function (params) {
          console.log('onSkip:');
        },
        onFacebook: function (params) {
          console.log('onFacebook:');
        }
      };
     }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push("TabsPage");
    }
  }

  onSignup() {
    this.navCtrl.push("SignupPage");
  }
  
  getDetails(id) {
    this.customerService.getCustomerDetails(id).subscribe(response => {
      this.details = response.customer;
      window.localStorage.setItem('customer_name', this.details.firstname + this.details.lastname);
      window.localStorage.setItem('avatar', this.details.avatar);
      window.localStorage.setItem('membership', this.details.membership);
      console.log(this.details);
    });
  }

  forgot() {
    var txt;
    var email = prompt("Please enter your email");
    if (email == null || email == "") {
      txt = "Process cancelled";
    } else {
      this.customerService.forgot(email).subscribe(response => {

        this.showMessage(response.message);
      });
    }
  }


  isCustomer(group_id) {
    console.log("Group id " + group_id);

    if (group_id == 1) {
      return true;
    }

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showMessage(text) {

    let alert = this.alertCtrl.create({
      title: 'Password Recovery',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }


  signUp() {
    this.navCtrl.setRoot("SignupPage");
  }

  verifyEmail(email) {
    this.loading.dismiss();
    let verifyModal = this.modalCtrl.create('VerifyEmailPage');
    verifyModal.present();
  }
}
