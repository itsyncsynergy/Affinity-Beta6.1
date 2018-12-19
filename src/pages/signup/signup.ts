import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { LoginPage } from '../login/login';


//load services
import { InterestService } from "../../services/interest.service";
import { LocationService } from "../../services/location.service";
import { CustomerService } from "../../services/customer.service";

//load interface
import { INewCustomer } from "../../interfaces/inewcustomer";
import { VerifyCodePage } from "../verify-code/verify-code";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  params: any = {};

  interestsData: any;

  countriesData: any;

  statesData: any;

  avatar: any;

  essence: any = false;

  premium: any = false;

  luxe: any = false;

  business: any = false;



  loading: Loading;

  customer: INewCustomer;

  code: string = "+234";

  constructor(public navCtrl: NavController, public navParams: NavParams, ) {

    this.params.countries = [
      { ccode: "ng", value: "234", name: "Nigeria", mcode: "+234" },
      { ccode: "us", value: "1", name: "USA", mcode: "+1" },
      { ccode: "gb", value: "44", name: "UK", mcode: "+44" },
      { ccode: "dz", value: "213", name: "Algeria", mcode: "+213" },
      { ccode: "ad", value: "376", name: "Andorra", mcode: "+376" },
      { ccode: "ao", value: "244", name: "Angola", mcode: "+244" },
      { ccode: "ai", value: "1264", name: "Anguilla", mcode: "+1264" },
      { ccode: "ag", value: "1268", name: "Antigua & Barbuda", mcode: "+1268" },
      { ccode: "ar", value: "54", name: "Argentina", mcode: "+54" },
      { ccode: "am", value: "374", name: "Armenia", mcode: "+374" },
      { ccode: "aw", value: "297", name: "Aruba", mcode: "+297" },
      { ccode: "au", value: "61", name: "Australia", mcode: "+61" },
      { ccode: "at", value: "43", name: "Austria", mcode: "+43" },
      { ccode: "az", value: "994", name: "Azerbaijan", mcode: "+994" },
      { ccode: "bs", value: "1242", name: "Bahamas", mcode: "+1242" },
      { ccode: "bh", value: "973", name: "Bahrain", mcode: "+973" },
      { ccode: "bd", value: "880", name: "Bangladesh", mcode: "+880" },
      { ccode: "bb", value: "1246", name: "Barbados", mcode: "+1246" },
      { ccode: "by", value: "375", name: "Belarus", mcode: "+375" },
      { ccode: "be", value: "32", name: "Belgium", mcode: "+32" },
      { ccode: "bz", value: "501", name: "Belize", mcode: "+501" },
      { ccode: "bj", value: "229", name: "Benin", mcode: "+229" },
      { ccode: "bm", value: "1441", name: "Bermuda", mcode: "+1441" },
      { ccode: "bt", value: "975", name: "Bhutan", mcode: "+975" },
      { ccode: "bo", value: "591", name: "Bolivia", mcode: "+591" },
      { ccode: "ba", value: "387", name: "Bosnia Herzegovina", mcode: "+387" },
      { ccode: "bw", value: "267", name: "Botswana", mcode: "+267" },
      { ccode: "br", value: "55", name: "Brazil", mcode: "+55" },
      { ccode: "bn", value: "673", name: "Brunei", mcode: "+673" },
      { ccode: "bg", value: "359", name: "Bulgaria", mcode: "+359" },
      { ccode: "bf", value: "226", name: "Burkina Faso", mcode: "+226" },
      { ccode: "bi", value: "257", name: "Burundi", mcode: "+257" },
      { ccode: "kh", value: "855", name: "Cambodia", mcode: "+855" },
      { ccode: "cm", value: "237", name: "Cameroon", mcode: "+237" },
      { ccode: "CA", value: "1", name: "Canada", mcode: "+1" },
      { ccode: "cv", value: "238", name: "Cape Verde Islands", mcode: "+238" },
      { ccode: "ky", value: "1345", name: "Cayman Islands", mcode: "+1345" },
      { ccode: "cf", value: "236", name: "Central African Republic", mcode: "+236" },
      { ccode: "cl", value: "56", name: "Chile", mcode: "+56" },
      { ccode: "cn", value: "86", name: "China", mcode: "+86" },
      { ccode: "co", value: "57", name: "Colombia", mcode: "+57" },
      { ccode: "km", value: "269", name: "Comoros", mcode: "+269" },
      { ccode: "cg", value: "242", name: "Congo", mcode: "+242" },
      { ccode: "ck", value: "682", name: "Cook Islands", mcode: "+682" },
      { ccode: "cr", value: "506", name: "Costa Rica", mcode: "+506" },
      { ccode: "hr", value: "385", name: "Croatia", mcode: "+385" },
      { ccode: "cu", value: "53", name: "Cuba", mcode: "+53" },
      { ccode: "cy", value: "90", name: "Cyprus - North", mcode: "+90" },
      { ccode: "cy", value: "357", name: "Cyprus - South", mcode: "+357" },
      { ccode: "cz", value: "420", name: "Czech Republic", mcode: "+420" },
      { ccode: "dk", value: "45", name: "Denmark", mcode: "+45" },
      { ccode: "dj", value: "253", name: "Djibouti", mcode: "+253" },
      { ccode: "dm", value: "1809", name: "Dominica", mcode: "+1809" },
      { ccode: "do", value: "1809", name: "Dominican Republic", mcode: "+1809" },
      { ccode: "ec", value: "593", name: "Ecuador", mcode: "+593" },
      { ccode: "eg", value: "20", name: "Egypt", mcode: "+20" },
      { ccode: "sv", value: "503", name: "El Salvador", mcode: "+503" },
      { ccode: "gq", value: "240", name: "Equatorial Guinea", mcode: "+240" },
      { ccode: "er", value: "291", name: "Eritrea", mcode: "+291" },
      { ccode: "ee", value: "372", name: "Estonia", mcode: "+372" },
      { ccode: "et", value: "251", name: "Ethiopia", mcode: "+251" },
      { ccode: "fk", value: "500", name: "Falkland Islands", mcode: "+500" },
      { ccode: "fo", value: "298", name: "Faroe Islands", mcode: "+298" },
      { ccode: "fj", value: "679", name: "Fiji", mcode: "+679" },
      { ccode: "fi", value: "358", name: "Finland", mcode: "+358" },
      { ccode: "fr", value: "33", name: "France", mcode: "+33" },
      { ccode: "gf", value: "594", name: "French Guiana", mcode: "+594" },
      { ccode: "pf", value: "689", name: "French Polynesia", mcode: "+689" },
      { ccode: "ga", value: "241", name: "Gabon", mcode: "+241" },
      { ccode: "gm", value: "220", name: "Gambia", mcode: "+220" },
      { ccode: "ge", value: "7880", name: "Georgia", mcode: "+7880" },
      { ccode: "de", value: "49", name: "Germany", mcode: "+49" },
      { ccode: "gh", value: "233", name: "Ghana", mcode: "+233" },
      { ccode: "gi", value: "350", name: "Gibraltar", mcode: "+350" },
      { ccode: "gr", value: "30", name: "Greece", mcode: "+30" },
      { ccode: "gl", value: "299", name: "Greenland", mcode: "+299" },
      { ccode: "gd", value: "1473", name: "Grenada", mcode: "+1473" },
      { ccode: "gp", value: "590", name: "Guadeloupe", mcode: "+590" },
      { ccode: "gu", value: "671", name: "Guam", mcode: "+671" },
      { ccode: "gt", value: "502", name: "Guatemala", mcode: "+502" },
      { ccode: "gn", value: "224", name: "Guinea", mcode: "+224" },
      { ccode: "gw", value: "245", name: "Guinea - Bissau", mcode: "+245" },
      { ccode: "gy", value: "592", name: "Guyana", mcode: "+592" },
      { ccode: "ht", value: "509", name: "Haiti", mcode: "+509" },
      { ccode: "hn", value: "504", name: "Honduras", mcode: "+504" },
      { ccode: "hk", value: "852", name: "Hong Kong", mcode: "+852" },
      { ccode: "hu", value: "36", name: "Hungary", mcode: "+36" },
      { ccode: "is", value: "354", name: "Iceland", mcode: "+354" },
      { ccode: "in", value: "91", name: "India", mcode: "+91" },
      { ccode: "id", value: "62", name: "Indonesia", mcode: "+62" },
      { ccode: "iq", value: "964", name: "Iraq", mcode: "+964" },
      { ccode: "ir", value: "98", name: "Iran", mcode: "+98" },
      { ccode: "ie", value: "353", name: "Ireland", mcode: "+353" },
      { ccode: "il", value: "972", name: "Israel", mcode: "+972" },
      { ccode: "it", value: "39", name: "Italy", mcode: "+39" },
      { ccode: "jm", value: "1876", name: "Jamaica", mcode: "+1876" },
      { ccode: "jp", value: "81", name: "Japan", mcode: "+81" },
      { ccode: "jo", value: "962", name: "Jordan", mcode: "+962" },
      { ccode: "kz", value: "7", name: "Kazakhstan", mcode: "+7" },
      { ccode: "ke", value: "254", name: "Kenya", mcode: "+254" },
      { ccode: "ki", value: "686", name: "Kiribati", mcode: "+686" },
      { ccode: "kp", value: "850", name: "Korea - North", mcode: "+850" },
      { ccode: "kr", value: "82", name: "Korea - South", mcode: "+82" },
      { ccode: "kw", value: "965", name: "Kuwait", mcode: "+965" },
      { ccode: "kg", value: "996", name: "Kyrgyzstan", mcode: "+996" },
      { ccode: "la", value: "856", name: "Laos", mcode: "+856" },
      { ccode: "lv", value: "371", name: "Latvia", mcode: "+371" },
      { ccode: "lb", value: "961", name: "Lebanon", mcode: "+961" },
      { ccode: "ls", value: "266", name: "Lesotho", mcode: "+266" },
      { ccode: "lr", value: "231", name: "Liberia", mcode: "+231" },
      { ccode: "ly", value: "218", name: "Libya", mcode: "+218" },
      { ccode: "li", value: "417", name: "Liechtenstein", mcode: "+417" },
      { ccode: "lt", value: "370", name: "Lithuania", mcode: "+370" },
      { ccode: "lu", value: "352", name: "Luxembourg", mcode: "+352" },
      { ccode: "mo", value: "853", name: "Macao", mcode: "+853" },
      { ccode: "mk", value: "389", name: "Macedonia", mcode: "+389" },
      { ccode: "mg", value: "261", name: "Madagascar", mcode: "+261" },
      { ccode: "mw", value: "265", name: "Malawi", mcode: "+265" },
      { ccode: "my", value: "60", name: "Malaysia", mcode: "+60" },
      { ccode: "mv", value: "960", name: "Maldives", mcode: "+960" },
      { ccode: "ml", value: "223", name: "Mali", mcode: "+223" },
      { ccode: "mt", value: "356", name: "Malta", mcode: "+356" },
      { ccode: "mh", value: "692", name: "Marshall Islands", mcode: "+692" },
      { ccode: "mq", value: "596", name: "Martinique", mcode: "+596" },
      { ccode: "mr", value: "222", name: "Mauritania", mcode: "+222" },
      { ccode: "yt", value: "269", name: "Mayotte", mcode: "+269" },
      { ccode: "mx", value: "52", name: "Mexico", mcode: "+52" },
      { ccode: "fm", value: "691", name: "Micronesia", mcode: "+691" },
      { ccode: "md", value: "373", name: "Moldova", mcode: "+373" },
      { ccode: "mc", value: "377", name: "Monaco", mcode: "+377" },
      { ccode: "mn", value: "976", name: "Mongolia", mcode: "+976" },
      { ccode: "ms", value: "1664", name: "Montserrat", mcode: "+1664" },
      { ccode: "ma", value: "212", name: "Morocco", mcode: "+212" },
      { ccode: "mz", value: "258", name: "Mozambique", mcode: "+258" },
      { ccode: "mn", value: "95", name: "Myanmar", mcode: "+95" },
      { ccode: "na", value: "264", name: "Namibia", mcode: "+264" },
      { ccode: "nr", value: "674", name: "Nauru", mcode: "+674" },
      { ccode: "np", value: "977", name: "Nepal", mcode: "+977" },
      { ccode: "nl", value: "31", name: "Netherlands", mcode: "+31" },
      { ccode: "nc", value: "687", name: "New Caledonia", mcode: "+687" },
      { ccode: "nz", value: "64", name: "New Zealand", mcode: "+64" },
      { ccode: "ni", value: "505", name: "Nicaragua", mcode: "+505" },
      { ccode: "ne", value: "227", name: "Niger", mcode: "+227" },
      { ccode: "ng", value: "234", name: "Nigeria", mcode: "+234" },
      { ccode: "nu", value: "683", name: "Niue", mcode: "+683" },
      { ccode: "nf", value: "672", name: "Norfolk Islands", mcode: "+672" },
      { ccode: "np", value: "670", name: "Northern Marianas", mcode: "+670" },
      { ccode: "no", value: "47", name: "Norway", mcode: "+47" },
      { ccode: "om", value: "968", name: "Oman", mcode: "+968" },
      { ccode: "pk", value: "92", name: "Pakistan", mcode: "+92" },
      { ccode: "pw", value: "680", name: "Palau", mcode: "+680" },
      { ccode: "pa", value: "507", name: "Panama", mcode: "+507" },
      { ccode: "pa", value: "675", name: "Papua New Guinea", mcode: "+675" },
      { ccode: "py", value: "595", name: "Paraguay", mcode: "+595" },
      { ccode: "pe", value: "51", name: "Peru", mcode: "+51" },
      { ccode: "ph", value: "63", name: "Philippines", mcode: "+63" },
      { ccode: "pl", value: "48", name: "Poland", mcode: "+48" },
      { ccode: "pt", value: "351", name: "Portugal", mcode: "+351" },
      { ccode: "pr", value: "1787", name: "Puerto Rico", mcode: "+1787" },
      { ccode: "qa", value: "974", name: "Qatar", mcode: "+974" },
      { ccode: "re", value: "262", name: "Reunion", mcode: "+262" },
      { ccode: "ro", value: "40", name: "Romania", mcode: "+40" },
      { ccode: "ru", value: "7", name: "Russia", mcode: "+7" },
      { ccode: "rw", value: "250", name: "Rwanda", mcode: "+250" },
      { ccode: "sm", value: "378", name: "San Marino", mcode: "+378" },
      { ccode: "st", value: "239", name: "Sao Tome & Principe", mcode: "+239" },
      { ccode: "sa", value: "966", name: "Saudi Arabia", mcode: "+966" },
      { ccode: "sn", value: "221", name: "Senegal", mcode: "+221" },
      { ccode: "cs", value: "381", name: "Serbia", mcode: "+381" },
      { ccode: "sc", value: "248", name: "Seychelles", mcode: "+248" },
      { ccode: "sl", value: "232", name: "Sierra Leone", mcode: "+232" },
      { ccode: "sg", value: "65", name: "Singapore", mcode: "+65" },
      { ccode: "sk", value: "421", name: "Slovak Republic", mcode: "+421" },
      { ccode: "si", value: "386", name: "Slovenia", mcode: "+386" },
      { ccode: "sb", value: "677", name: "Solomon Islands", mcode: "+677" },
      { ccode: "so", value: "252", name: "Somalia", mcode: "+252" },
      { ccode: "za", value: "27", name: "South Africa", mcode: "+27" },
      { ccode: "es", value: "34", name: "Spain", mcode: "+34" },
      { ccode: "lk", value: "94", name: "Sri Lanka", mcode: "+94" },
      { ccode: "sh", value: "290", name: "St. Helena", mcode: "+290" },
      { ccode: "kn", value: "1869", name: "St. Kitts", mcode: "+1869" },
      { ccode: "sc", value: "1758", name: "St. Lucia", mcode: "+1758" },
      { ccode: "sr", value: "597", name: "Suriname", mcode: "+597" },
      { ccode: "sd", value: "249", name: "Sudan", mcode: "+249" },
      { ccode: "sz", value: "268", name: "Swaziland", mcode: "+268" },
      { ccode: "se", value: "46", name: "Sweden", mcode: "+46" },
      { ccode: "ch", value: "41", name: "Switzerland", mcode: "+41" },
      { ccode: "sy", value: "963", name: "Syria", mcode: "+963" },
      { ccode: "tw", value: "886", name: "Taiwan", mcode: "+886" },
      { ccode: "tj", value: "992", name: "Tajikistan", mcode: "+992" },
      { ccode: "th", value: "66", name: "Thailand", mcode: "+66" },
      { ccode: "tg", value: "228", name: "Togo", mcode: "+228" },
      { ccode: "to", value: "676", name: "Tonga", mcode: "+676" },
      { ccode: "tt", value: "1868", name: "Trinidad & Tobago", mcode: "+1868" },
      { ccode: "tn", value: "216", name: "Tunisia", mcode: "+216" },
      { ccode: "tr", value: "90", name: "Turkey", mcode: "+90" },
      { ccode: "tm", value: "993", name: "Turkmenistan", mcode: "+993" },
      { ccode: "tc", value: "1649", name: "Turks & Caicos Islands", mcode: "+1649" },
      { ccode: "tv", value: "688", name: "Tuvalu", mcode: "+688" },
      { ccode: "ug", value: "256", name: "Uganda", mcode: "+256" },
      { ccode: "ua", value: "380", name: "Ukraine", mcode: "+380" },
      { ccode: "ae", value: "971", name: "United Arab Emirates", mcode: "+971" },
      { ccode: "uy", value: "598", name: "Uruguay", mcode: "+598" },
      { ccode: "uz", value: "998", name: "Uzbekistan", mcode: "+998" },
      { ccode: "vu", value: "678", name: "Vanuatu", mcode: "+678" },
      { ccode: "va", value: "379", name: "Vatican City", mcode: "+379" },
      { ccode: "ve", value: "58", name: "Venezuela", mcode: "+58" },
      { ccode: "vn", value: "84", name: "Vietnam", mcode: "+84" },
      { ccode: "vg", value: "1", name: "Virgin Islands - British", mcode: "+1" },
      { ccode: "vi", value: "1", name: "Virgin Islands - US", mcode: "+1" },
      { ccode: "wf", value: "681", name: "Wallis & Futuna", mcode: "+681" },
      { ccode: "ye", value: "969", name: "Yemen", mcode: "+969" },
      { ccode: "ye", value: "967", name: "Yemen", mcode: "+967" },
      { ccode: "zm", value: "260", name: "Zambia", mcode: "+260" },
      { ccode: "zw", value: "263", name: "Zimbabwe", mcode: "+263" }
    ];


    this.params.data = {
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
      "register": "Register",
      "skip": "Skip",
      "title": "Create New Account",
      "toolbarTitle": "Register",
      "name": "Full Name",
      "phone": "Phone",
      "signin": "SIGN IN",
      "errorName": "We would need your Name",
      "errorEmail": "Please provide your Email",
      "errorCode": "Required",
      "errorPhone": "Required",
      "errorPassword": "Required",
      "errorConfirmPassword": "Must Match Password"

    }

    this.params.events = {
      onRegister: function (params) {
        console.log('onRegister');
      },
      onSkip: function (params) {
        console.log('onSkip');
      },
      onSignin: function (params) {
        console.log('onSignin');
      }
    };
  }
  ngOnInit() {
    this.customer = {
      username: '',
      firstname: '',
      lastname: '',
      dob: '',
      name: '',
      email: '',
      address: '',
      country: '',
      state: '',
      city: '',
      membership: '',
      sex: '',
      phone: '',
      password: '',
      agreement_checkbox: "true",
      interests: []
    };
    //this.getInterests();

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
