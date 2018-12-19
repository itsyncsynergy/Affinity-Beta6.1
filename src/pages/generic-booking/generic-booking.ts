import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController, LoadingController, Loading  } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { mobiscroll, MbscRangeOptions } from '@mobiscroll/angular';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the GenericBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
mobiscroll.settings = {
  theme: 'material',
  lang: 'en'
};

let now = new Date(),
    week = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, 23, 59)];


@IonicPage()
@Component({
  
  selector: 'page-generic-booking',
  templateUrl: 'generic-booking.html',
})
export class GenericBookingPage {
    data: any;
    user_image_link: any;
    api : string;
    locale: string;
    base_url:any;
    airlines: any;

    profile_segment: string
    active: boolean;

    public return : FormGroup;
    public oneway : FormGroup;
    public multi : FormGroup;

    range: String ;
    date: Array < String > ;
    rangeCenter: Array < Date > ;
    nonForm: Array < Date > ;
    external: Array < Date > = week;

    rangeCenterSettings: any = {
      display: 'center',
      theme: 'material',
      returnFormat: 'locale'
    };

    dateSettings: MbscRangeOptions = {
      startInput: '#startDate',
      endInput: '#endDate',
      controls: ['date']
    };

    externalSettings: MbscRangeOptions = {
        showOnTap: false,
        showOnFocus: false
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public storage: Storage, public http: HttpClient, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    this.profile_segment = 'return';
    this.api = AppSettings.API_ENDPOINT;
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    this.airlines = [
      {
        "id": 1,
        "name": "Emirates"
      },
      {
        "id": 2,
        "name": "Qatar Airways"
      },
      {
        "id": 3,
        "name": "Singapore Airlines"
      },
      {
        "id": 4,
        "name": "Cathay Pacific Airways"
      },
      {
        "id": 5,
        "name": "ANA All Nippon Airways"
      },
      {
        "id": 6,
        "name": "Etihad Airways"
      },
      {
        "id": 7,
        "name": "Turkish Airlines"
      },
      {
        "id": 8,
        "name": "EVA Air"
      },
      {
        "id": 9,
        "name": "Qantas Airways"
      },
      {
        "id": 10,
        "name": "Lufthansa"
      },
      {
        "id": 11,
        "name": "Garuda Indonesia"
      },
      {
        "id": 12,
        "name": "Hainan Airlines"
      },
      {
        "id": 13,
        "name": "Thai Airways"
      },
      {
        "id": 14,
        "name": "Air France"
      },
      {
        "id": 15,
        "name": "Swiss International Air Lines"
      },
      {
        "id": 16,
        "name": "Asiana Airlines"
      },
      {
        "id": 17,
        "name": "Air New Zealand"
      },
      {
        "id": 18,
        "name": "Virgin Australia"
      },
      {
        "id": 19,
        "name": "Austrian Airlines"
      },
      {
        "id": 20,
        "name": "Bangkok Airways"
      },
      {
        "id": 21,
        "name": "Dragonair"
      },
      {
        "id": 22,
        "name": "Air Asia"
      },
      {
        "id": 23,
        "name": "KLM Royal Dutch Airlines"
      },
      {
        "id": 24,
        "name": "Virgin America"
      },
      {
        "id": 25,
        "name": "British Airways"
      },
      {
        "id": 26,
        "name": "Finnair"
      },
      {
        "id": 27,
        "name": "Virgin Atlantic"
      },
      {
        "id": 28,
        "name": "Hong Kong Airlines"
      },
      {
        "id": 29,
        "name": "Norwegian"
      },
      {
        "id": 30,
        "name": "Air Canada"
      },
      {
        "id": 31,
        "name": "China Southern Airlines"
      },
      {
        "id": 32,
        "name": "Aegean Airlines"
      },
      {
        "id": 33,
        "name": "Malaysia Airlines"
      },
      {
        "id": 34,
        "name": "Delta Air Lines"
      },
      {
        "id": 35,
        "name": "Korean Air"
      },
      {
        "id": 36,
        "name": "China Airlines"
      },
      {
        "id": 37,
        "name": "EasyJet"
      },
      {
        "id": 38,
        "name": "Silk Air"
      },
      {
        "id": 39,
        "name": "Aeroflot"
      },
      {
        "id": 40,
        "name": "South African Airways"
      },
      {
        "id": 41,
        "name": "Oman Air"
      },
      {
        "id": 42,
        "name": "Air Astana"
      },
      {
        "id": 43,
        "name": "Vietnam Airlines"
      },
      {
        "id": 44,
        "name": "LAN Airlines"
      },
      {
        "id": 45,
        "name": "Jetstar Airways"
      },
      {
        "id": 46,
        "name": "Porter Airlines"
      },
      {
        "id": 47,
        "name": "AirAsia X"
      },
      {
        "id": 48,
        "name": "Aer Lingus"
      },
      {
        "id": 49,
        "name": "WestJet"
      },
      {
        "id": 50,
        "name": "IndiGo"
      },
      {
        "id": 51,
        "name": "Iberia"
      },
      {
        "id": 52,
        "name": "JetBlue Airways"
      },
      {
        "id": 53,
        "name": "Jetstar Asia"
      },
      {
        "id": 54,
        "name": "Azul Airlines"
      },
      {
        "id": 55,
        "name": "Avianca"
      },
      {
        "id": 56,
        "name": "TAM Airlines"
      },
      {
        "id": 57,
        "name": "Alitalia"
      },
      {
        "id": 45,
        "name": "Brussels Airlines"
      },
      {
        "id": 58,
        "name": "Alaska Airlines"
      },
      {
        "id": 59,
        "name": "Scoot"
      },
      {
        "id": 60,
        "name": "SAS Scandinavian"
      },
      {
        "id": 61,
        "name": "Air Seychelles"
      },
      {
        "id": 62,
        "name": "TAP Portugal"
      },
      {
        "id": 63,
        "name": "Thomson Airways"
      },
      {
        "id": 64,
        "name": "Southwest Airlines"
      },
      {
        "id": 65,
        "name": "SriLankan Airlines"
      },
      {
        "id": 66,
        "name": "United Airlines"
      },
      {
        "id": 67,
        "name": "Copa Airlines"
      },
      {
        "id": 68,
        "name": "Azerbaijan Airlines"
      },
      {
        "id": 69,
        "name": "Jet Airways"
      },
      {
        "id": 70,
        "name": "Hawaiian Airlines"
      },
      {
        "id": 71,
        "name": "Air Mauritius"
      },
      {
        "id": 72,
        "name": "Air Berlin"
      },
      {
        "id": 73,
        "name": "Eurowings"
      },
      {
        "id": 74,
        "name": "Ethiopian Airlines"
      },
      {
        "id": 75,
        "name": "American Airlines"
      },
      {
        "id": 76,
        "name": "Peach"
      },
      {
        "id": 77,
        "name": "China Eastern Airlines"
      },
      {
        "id": 78,
        "name": "Gulf Air"
      },
      {
        "id": 79,
        "name": "Iceland Air"
      },
      {
        "id": 80,
        "name": "Saudi Arabian Airlines"
      },
      {
        "id": 81,
        "name": "Philippine Airlines"
      },
      {
        "id": 82,
        "name": "American Eagle"
      },
      {
        "id": 83,
        "name": "Kenya Airways"
      },
      {
        "id": 84,
        "name": "TAAG Angola Airlines"
      },
      {
        "id": 85,
        "name": "Air China"
      },
      {
        "id": 86,
        "name": "Air Transat"
      },
      {
        "id": 87,
        "name": "Air Nostrum"
      },
      {
        "id": 88,
        "name": "Juneyao Airlines"
      },
      {
        "id": 89,
        "name": "Fiji Airways"
      },
      {
        "id": 90,
        "name": "LOT Polish"
      },
      {
        "id": 91,
        "name": "Kulula"
      },
      {
        "id": 92,
        "name": "Aeromexico"
      },
      {
        "id": 93,
        "name": "Royal Brunei Airlines"
      },
      {
        "id": 94,
        "name": "Tianjin Airlines"
      },
      {
        "id": 95,
        "name": "Tigerair"
      },
      {
        "id": 96,
        "name": "Mango"
      },
      {
        "id": 97,
        "name": "Royal Jordanian Airlines"
      },
      {
        "id": 98,
        "name": "SpiceJet"
      },
      {
        "id": 99,
        "name": "Japan Airlines"
      },
      {
        "id": 100,
        "name": "Eva Air"
      }
    ];
    this.airlines.sort((a, b) => a.name <= b.name ? -1 : 1);
    this.data = {
      "background": "assets/images/background/airlines/virgin.png",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Flight Booking",
      "airlines": this.airlines
    }

    this.return = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      request_type: ['Return'],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      return_date: ['', Validators.required],
      depart_date: ['', Validators.required],
      num_pass: ['', Validators.required],
      cabin: ['', Validators.required],
      curr: ['', Validators.required],
      date_flex: ['', Validators.required],
      flier_no: [''],
      pref_airline: ['', Validators.required]
    });

    this.oneway = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      request_type: ['One-Way'],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      num_pass: ['', Validators.required],
      cabin: ['', Validators.required],
      curr: ['', Validators.required],
      date_flex: ['', Validators.required],
      flier_no: [''],
      pref_airline: ['', Validators.required]
    });

    this.multi = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      request_type: ['Multi'],
      num_pass: ['', Validators.required],
      cabin: ['', Validators.required],
      curr: ['', Validators.required],
      date_flex: ['', Validators.required],
      flier_no: [''],
      pref_airline: ['', Validators.required],
      flight    : this.formBuilder.array([
        this.initDateFields()
      ])
      
    });
  }

  /**
    * Generates a FormGroup object with input field validation rules for
    * the technologies form object
    *
    * @public
    * @method initTechnologyFields
    * @return {FormGroup}
    */
   initDateFields() : FormGroup
   {
      return this.formBuilder.group({
         date 		: ['', Validators.required],
         origin : ['', Validators.required],
         destination : ['', Validators.required]
      });
   }

    /**
    * Programmatically generates a new technology input field
    *
    * @public
    * @method addNewInputField
    * @return {none}
    */
   addNewInputField() : void
   {
      const control = <FormArray>this.multi.controls.flight;
      control.push(this.initDateFields());

   }

    /**
    * Programmatically removes a recently generated technology input field
    *
    * @public
    * @method removeInputField
    * @param i    {number}      The position of the object in the array that needs to removed
    * @return {none}
    */
   removeInputField(i : number) : void
   {
    const control = <FormArray>this.multi.controls.flight;
    control.removeAt(i);

   }

    /**
    * Receive the submitted form data
    *
    * @public
    * @method manage
    * @param val    {object}      The posted form data
    * @return {none}
    */
   sendReturn(){
    const loader = this.loadingCtrl.create({
          spinner: 'hide',
          content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
        });
        loader.present();
      var url = this.api + 'flight_booking';
      this.data = this.http.post(url, this.return.value);
      this.data.subscribe(data => {
        if (data['error'] == false){
          loader.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Message',
            message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + 'We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navCtrl.pop();
              }
            }] 
          });
          alert.present();
          console.log(data);
          return; 
        }
      });
      console.log(this.return.value)
  }

  sendOneWay(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
    });
    loader.present();
    var url = this.api + 'flight_booking';
    this.data = this.http.post(url, this.oneway.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + 'We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }] 
        });
        alert.present();
        console.log(data);
        return; 
      }
    });
    console.log(this.oneway.value)
  }

  sendMulti(val : any)  : void 
  {
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
    });
    loader.present();
    var url = this.api + 'flight_booking';
    this.data = this.http.post(url, this.multi.value);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Message',
          message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + 'We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }] 
        });
        alert.present();
        console.log(data);
        return; 
      }
    });
    console.log(this.multi.value)
    // console.log(val);
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();
  }

  isClassActive() {
    return this.active;
  }

  segmentChanged(event) {
    //change to the selected tab
    //document.getElementById(event).style.display = "none";
    console.log(event);
  }

  showReturn() {
    document.getElementById('return').style.display = "";
    document.getElementById('one-way').style.display = "none";
    document.getElementById('multi').style.display = "none";
  
  }

  showOneWay() {
    document.getElementById('return').style.display = "none";
    document.getElementById('one-way').style.display = "";
    document.getElementById('multi').style.display = "none";
   

  }

  showMulti() {
    document.getElementById('return').style.display = "none";
    document.getElementById('one-way').style.display = "none";
    document.getElementById('multi').style.display = "";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenericBookingPage');
  }

}
