import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events, ModalController } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';

mobiscroll.settings = {
    theme: 'ios',
    lang: 'fr'
};
import { AuthService } from '../../../services/authservice';

@IonicPage()
@Component({
    selector: 'register-layout-1',
    templateUrl: 'register.html'
})
export class RegisterLayout1 {
    // Place the code below into your own component or use the full template

    select: string = "AF";
    filter: string = "AF";
    myselect: string = "AF";
    external: string = "AF";

    myData = [{
        value: 'AF',
        group: 'A',
        text: 'Afghanistan'
    },
    {
        value: 'AL',
        group: 'A',
        text: 'Albania'
    },
    {
        value: 'DZ',
        group: 'A',
        text: 'Algeria'
    },
    {
        value: 'AD',
        group: 'A',
        text: 'Andorra'
    },
    {
        value: 'AO',
        group: 'A',
        text: 'Angola'
    },
    {
        value: 'AR',
        group: 'A',
        text: 'Argentina'
    },
    {
        value: 'AM',
        group: 'A',
        text: 'Armenia'
    },
    {
        value: 'AW',
        group: 'A',
        text: 'Aruba'
    },
    {
        value: 'AU',
        group: 'A',
        text: 'Australia'
    },
    {
        value: 'AT',
        group: 'A',
        text: 'Austria'
    },
    {
        value: 'AZ',
        group: 'A',
        text: 'Azerbaijan'
    },
    {
        value: 'BH',
        group: 'B',
        text: 'Bahrain'
    },
    {
        value: 'BD',
        group: 'B',
        text: 'Bangladesh'
    },
    {
        value: 'BY',
        group: 'B',
        text: 'Belarus'
    },
    {
        value: 'BE',
        group: 'B',
        text: 'Belgium'
    },
    {
        value: 'BZ',
        group: 'B',
        text: 'Belize'
    },
    {
        value: 'BJ',
        group: 'B',
        text: 'Benin'
    },
    {
        value: 'BT',
        group: 'B',
        text: 'Bhutan'
    },
    {
        value: 'BO',
        group: 'B',
        text: 'Bolivia'
    },
    {
        value: 'BA',
        group: 'B',
        text: 'Bosnia And Herzegovina'
    },
    {
        value: 'BW',
        group: 'B',
        text: 'Botswana'
    },
    {
        value: 'BR',
        group: 'B',
        text: 'Brazil'
    },
    {
        value: 'IO',
        group: 'B',
        text: 'British Indian Ocean Territory'
    },
    {
        value: 'BN',
        group: 'B',
        text: 'Brunei Darussalam'
    },
    {
        value: 'BG',
        group: 'B',
        text: 'Bulgaria'
    },
    {
        value: 'BF',
        group: 'B',
        text: 'Burkina Faso'
    },
    {
        value: 'BI',
        group: 'B',
        text: 'Burundi'
    },
        // Showing partial data. Download full source.  
    ];

    @Input() data: any;
    //@Input() events: any;
    @Input() countries: any;

    public name: string;
    public password: string;
    public confirmPassword: string;
    public phone: string;
    public code: string;
    public email: string;

    private isEmailValid: boolean = true;
    private isNameValid: boolean = true;
    private isPasswordValid: boolean = true;
    private isConfirmPasswordValid: boolean = true;
    private isCodeValid: boolean = true;
    private isPhoneValid: boolean = true;

    private regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    loading: Loading;



    user: any;

    customer: any;

    details: any;

    usercreds = {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        code: '',
        phone: ''
    };

    image: string;
    imageSettings: any = {
        theme: 'affinity-club',
        lang: 'en',
        placeholder: 'Select country...',
        showLabel: false,
        enhance: true,
        labels: ['Country Code'],
        defaultValue: ['+234']
    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public authservice: AuthService,
        public alertCtrl: AlertController,
        private events: Events,
        private modalCtrl: ModalController) {

    }

    onEvent = (event: string): void => {
        if (event == "onRegister" && !this.validate()) {
            return;
        }
        if (this.events[event]) {
            this.events[event]({
                'name': this.name,
                'password': this.password,
                'confirmPassword': this.confirmPassword,
                'phone': this.phone,
                'code': this.code,
                'email': this.email
            });
        }
    }

    validate(): boolean {
        this.isEmailValid = true;
        this.isNameValid = true;
        this.isPasswordValid = true;
        this.isCodeValid = true;
        this.isPhoneValid = true;
        this.isConfirmPasswordValid = true;

        if (!this.usercreds.name || this.usercreds.name.length == 0) {
            this.isNameValid = false;
        }

        if (!this.usercreds.password || this.usercreds.password.length < 6) {
            this.isPasswordValid = false;
            this.showError("Password cannot be less than 6 characters");
        }

        if (!this.usercreds.confirmPassword || this.usercreds.confirmPassword.length == 0) {
            this.isConfirmPasswordValid = false;
        }

        if (!this.usercreds.code || this.usercreds.code.length == 0) {
            this.isCodeValid = true;
            this.usercreds.code = '234';
            // this.showError("Select a country code");
        }

        if (!this.usercreds.phone || this.usercreds.phone.length < 8) {
            this.isPhoneValid = false;
            this.showError("Phone number not complete");
        }
        if (!(this.usercreds.password == this.usercreds.confirmPassword)) {
            this.isConfirmPasswordValid = false;
            this.isPasswordValid = false;
            this.showError("Password fields do not match");
        }

        this.isEmailValid = this.regex.test(this.usercreds.email);

        return this.isEmailValid &&
            this.isPasswordValid &&
            this.isConfirmPasswordValid &&
            this.isNameValid &&
            this.isCodeValid &&
            this.isPhoneValid;
    }

    register(): boolean {

        let loading = this.loadingCtrl.create({
            spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
        });
        loading.present();
        if (!this.validate()) {
            console.log('Not Valid');
            // console.log("Wrong Credentials");
            //this.showError("Wrong Credentials");
            loading.dismiss();
            return;
        } else {

            this.authservice.register(this.usercreds).subscribe(response => {
                console.log('got here 990')
                console.log("response is" + response);
                loading.dismiss();
                if (!response['error']) {
                    if (response['response'] == 'error') {
                        if (response['code'] == 3) {
                            this.verifyEmail(this.usercreds);
                        }
                        else if (response['code'] == 400) {
                            this.showError(response['message']);
                        } else {
                            console.log(response);
                            console.log("Invalid Signup Detials");
                            loading.dismiss();
                            this.showError(response['message']);
                            return;
                        }

                    } else {
                        //User login successfully...
                        console.log("Successfully registered. Awaiting verification");
                        this.verifyEmail(this.usercreds);
                    }


                }
                else {
                    // User not logged in... Wrong credentials
                    console.log(response);
                    console.log("Wrong Credentials");
                    this.showError("Wrong Credentials");
                }


            })

        }


    }

    loginPage() {
        this.navCtrl.push('LoginPage');
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

    verifyEmail(email) {
        //this.loading.dismiss();
        console.log(email);
        let verifyModal = this.modalCtrl.create('VerifyEmailPage', email);
        verifyModal.present();
    }

}
