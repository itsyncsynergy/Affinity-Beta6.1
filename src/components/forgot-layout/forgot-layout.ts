import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app/appSettings';


@IonicPage()
@Component({
  selector: 'forgot-layout',
  templateUrl: 'forgot-layout.html'
})
export class ForgotLayoutComponent {

  text: string;
  api:string;

  @Input() data: any;
  @Input() events: any;

  public username: string;
  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;
  private profile:  FormGroup;

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController, private formBuilder: FormBuilder, public http: HttpClient) {
      this.api = AppSettings.API_ENDPOINT;
    console.log('Hello ForgotLayoutComponent Component');
    this.text = 'Hello World';

    this.profile = this.formBuilder.group({
      email: ['', Validators.required],
      
    });
  }

  onEvent = (event: string): void => {
    if (event == "onLogin" && !this.validate()) {
      return;
    }
    if (this.events[event]) {
      this.events[event]({
        'username': this.username,
        'password': this.password
      });
    }
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

  reset(){
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      
    });
    loader.present();

    var url = this.api + 'auth/reset_password';
    this.data = this.http.post(url, this.profile.value);
    this.data.subscribe(data => {
      if (data['success'] == true) {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Message',
          message: data['message'],
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }] 
        });
        alert.present();
        console.log(data);

      } else if (data['success'] == false) {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Message',
          message: data['message'],
          buttons: [{
            text: 'OK',
            handler: () => {
              console.log('button pressed')
            }
          }] 
        });
        alert.present();
      }
    });
    console.log(this.profile.value);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
