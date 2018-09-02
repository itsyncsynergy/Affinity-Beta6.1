import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'forgot-layout',
  templateUrl: 'forgot-layout.html'
})
export class ForgotLayoutComponent {

  text: string;

  @Input() data: any;
  @Input() events: any;

  public username: string;
  public password: string;

  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController) {
    console.log('Hello ForgotLayoutComponent Component');
    this.text = 'Hello World';
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

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
