import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController, LoadingController, Loading  } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { mobiscroll, MbscRangeOptions } from '@mobiscroll/angular';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AppSettings } from '../../app/appSettings';



/**
 * Generated class for the FlightBookingPage page.
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
  
  selector: 'page-flight-booking',
  templateUrl: 'flight-booking.html',
  
})
export class FlightBookingPage {

    data: any;
    user_image_link: any;
    api : string;
    locale: string;
    base_url:any;

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
    
    this.data = {
      "background": "assets/images/background/airlines/virgin.png",
      "customer_id": localStorage.getItem('customer_id'),
      "headerTitle": "Flight Booking"
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
      flier_no: ['']
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
      flier_no: ['']
    });

    this.multi = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      request_type: ['Multi'],
      num_pass: ['', Validators.required],
      cabin: ['', Validators.required],
      curr: ['', Validators.required],
      date_flex: ['', Validators.required],
      flier_no: [''],
      flight    : this.formBuilder.array([
        this.initDateFields()
      ])
      
    });
     
  }

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
            message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + ', We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
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
          message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + ', We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
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
          message: '<p class="emoji-text">Dear ' + localStorage.getItem('firstname') + ', We are thrilled to hear from you. Your booking details have been forwarded to a member of our travel team and you’ll be contacted soon. Thank you.</p>',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightBookingPage');
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


}
