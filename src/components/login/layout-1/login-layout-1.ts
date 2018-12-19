import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events, ModalController, MenuController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../../services/authservice";
import { CustomerService } from "../../../services/customer.service";
//import { VerifyEmailPage } from '../../../pages/verify-email/verify-email';
export interface PageInterface {
    title: string;
    name: string;
    icon: string;
    logsOut?: boolean;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    component: string;

}

@IonicPage()
@Component({
    selector: 'login-layout-1',
    templateUrl: 'login.html'
})


export class LoginLayout1 {
    @Input() data: any;
    //@Input() events: any;
    appPages: PageInterface[] = [
        { title: 'Profile', name: 'ProfilePage', component: 'ProfilePage', tabComponent: 'ProfilePage', index: 0, icon: 'calendar' },
        { title: 'App Info', name: 'AppInfoPage', component: 'AppInfoPage', tabComponent: 'AppInfoPage', index: 1, icon: 'contacts' },
        { title: 'Terms of Service', name: 'TosPage', component: 'TosPage', tabComponent: 'TosPage', index: 2, icon: 'map' }
    ];
    loggedInPages: PageInterface[] = [
        { title: 'FAQ', name: 'FaqPage', component: 'FaqPage', icon: 'person' },
        { title: 'Privacy Policy', name: 'PrivacyPolicyPage', component: 'PrivacyPolicyPage', icon: 'help' },
        { title: 'Contact Us', name: 'ContactPage', component: 'ContactPage', icon: 'log-out', logsOut: true }
    ];

    HAS_LOGGED_IN = 'hasLoggedIn';

    loading: Loading;



    user: any;
    token: any;
    redemption: any;
    interest: any;
    activities: any;
    subscription: any;


    customer: any;

    details: any;

    usercreds = {
        username: '',
        password: ''
    };

    public username: string;
    public password: string;

    private isUsernameValid: boolean = true;
    private isPasswordValid: boolean = true;
  
    credentialsForm: FormGroup;

    constructor(public modalCtrl: ModalController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public authservice: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        public menu: MenuController,
        public storage: Storage,
        private events: Events) {
        
        this.credentialsForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
         }

    onEvent = (event: string): void => {
        if (event == "onLogin" && !this.validate()) {
            return ;
        }
        if (this.events[event]) {
            this.events[event]({
                'username' : this.username,
                'password' : this.password
            });
        }
      }
    
    validate():boolean {
        this.isUsernameValid = true;
        this.isPasswordValid = true;

        if (!this.usercreds.username || this.usercreds.username.length == 0) {
            this.isUsernameValid = false;
        }
    
        if (!this.usercreds.password || this.usercreds.password.length == 0) {
            this.isPasswordValid = false;
        }

        
        
        return this.isPasswordValid && this.isUsernameValid;
     }

     onForgot() {
         console.log('onForgot:');
         let forgotModal = this.modalCtrl.create('ForgotPage');
         forgotModal.present();
     }

    login(): boolean {
        //this.menu = menu;
        this.menu.enable(false)
        
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
        });
        loading.present();
        if (!this.validate()) {
            console.log('Got here');
           // console.log("Wrong Credentials");
            //this.showError("Wrong Credentials");
            loading.dismiss();
            return;
        }else {
            
            this.authservice.authenticate(this.usercreds).subscribe(response => { 
                console.log('got here')
                console.log("response is" + response);
                if (!response['error']) {
                    if (response['response'] == 'error') {
                        if (response['code'] == 3) {
                            this.verifyEmail(this.usercreds.username);
                            
                        } else {
                            console.log(response);
                            console.log("Wrong Credentials");
                            loading.dismiss();
                            this.showError("Wrong Credentials");
                            return;
                        }
                        
                    } else {
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
                            window.localStorage.setItem('redemption', JSON.stringify(this.redemption) );
                            window.localStorage.setItem('interest', JSON.stringify(this.interest));
                            window.localStorage.setItem('activities', JSON.stringify(this.activities));
                            window.localStorage.setItem('subscription', JSON.stringify(this.subscription));

                            this.events.publish('user:signedIn', this.customer);
                            this.enableMenu(true);
                            this.storage.set(this.HAS_LOGGED_IN, true);
                            loading.dismiss();
                            if (this.user.membership == null) {
                                this.navCtrl.setRoot("MembershipOptionPage");
                                return;
                            } else {
                                this.navCtrl.setRoot("TabsPage");
                                return;
                            }
                           
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
                }
                console.log("Wrong Credentials");
                loading.dismiss();
                this.showError("Your Account is inactive. Contact the Administrator");
                return;

            });

        }
        
    
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
        //this.loading.dismiss();

        let alert = this.alertCtrl.create({
            //title: 'Login Failed',
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
        this.navCtrl.push('SignupPage');
    }

    verifyEmail(email) {
        //this.loading.dismiss();
        let verifyModal = this.modalCtrl.create('VerifyEmailPage', email);
        verifyModal.present();
    }

    enableMenu(loggedIn: boolean) {
        this.menu.enable(loggedIn, 'loggedInMenu');
    }
}


