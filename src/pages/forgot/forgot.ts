import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events, ModalController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { AuthService } from "../../services/authservice";
import { CustomerService } from "../../services/customer.service";
import { DashboardPage } from "../dashboard/dashboard";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  

  public username: string;
  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  params: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params.data = {
      "background": "assets/images/background/32.jpg",
      "username": "Enter your email",
      "password": "Enter your password",
      "labelUsername": "Email Address",
      "labelPassword": "PASSWORD",
      "register": "Register now!",
      "forgotPassword": "Forgot Password?",
      "login": "RESET PASSWORD",
      "subtitle": "Welcome",
      "title": "Forgot Password!",
      "skip": "Skip",
      "logo": "assets/images/logo/affinity.png",
      "errorUser": "Opss! You forgot your email?",
      "errorPassword": "O! We would need your password.",
      "phone": "Phone",
      "labelphone": ""
    }
    this.params.events = {
      onLogin: function (user) {
        //this.showLoading();
        console.log(user);
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

                this.events.publish('user:signedIn', this.customer);

                console.log(response.customer);
                console.log(JSON.stringify(this.customer));

              });

              this.loading.dismiss();
              this.navCtrl.setRoot(DashboardPage);

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
        let forgotModal = this.modalCtrl.create(ForgotPage);
        forgotModal.present();
      },
      onRegister: function (params) {
        //move to the signuo page
        this.navCtrl.push(SignupPage);
      },
      onSkip: function (params) {
        console.log('onSkip:');
      },
      onFacebook: function (params) {
        console.log('onFacebook:');
      }
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }


  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if (!this.username || this.username.length == 0) {
      this.isUsernameValid = false;
    }

    if (!this.password || this.password.length == 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }

}
