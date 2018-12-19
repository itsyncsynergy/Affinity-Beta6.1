import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController , Loading, ViewController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { mobiscroll, MbscEventcalendarOptions } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the InterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let now = new Date();

@IonicPage()
@Component({
  selector: 'page-interest',
  templateUrl: 'interest.html',
})
export class InterestPage {
  data: any;
  events: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  headerImage: string;
  group: any;
  gallery: any;
  posts:any;
  activities:any;
  profile_segment: string
  active: boolean;
  interest: any;
  status:number;
  customer_id: any;
  api : string;
  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController, public http: HttpClient, private alertCtrl: AlertController) {
    this.api = AppSettings.API_ENDPOINT;
    this.profile_segment = 'home';
    this.customer_id = localStorage.getItem('customer_id');
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.interest = JSON.parse(localStorage.getItem('interest') || null);
    console.log(navParams.data.id)
    console.log(this.interest)
    this.showLoading()
    this.customerService.getList('join/' + navParams.data.id +'/'+ this.customer_id).subscribe(response => {

      console.log(response);
      this.group = response['group'];
      this.gallery = response['gallery'];
      this.posts = response['posts'];
      this.activities = response['activities'];
      this.status = response['status'];
      this.headerImage = this.group.avatar;
      if (this.activities != null) {

          var events = this.activities;
        for (var i = 0; i < events.length; i++) {
            events[i].start = events[i].start ? new Date(events[i].start) : null;
            events[i].end = events[i].end ? new Date(events[i].end) : null;
        };
        this.events = events;

      }
      

      this.data = {
        "headerTitle": this.group.name,
        "headerImage": this.headerImage,
        "details": this.group.details,
        "title": this.group.name,
        "gallery": this.gallery,
        "posts": this.posts,
        "activities": this.activities,
        "group": this.group,
        "interest": this.interest,
        "status": this.status

      }
      this.loading.dismiss();
      
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestPage');
  }

  isClassActive() {
    return this.active;
  }

  eventSettings: MbscEventcalendarOptions = {
    lang: 'en',
   
    display: 'inline',
    view: {
        calendar: { type: 'month' },
        eventList: { type: 'month' }
    }
  };

  segmentChanged(event) {
    //change to the selected tab
    //document.getElementById(event).style.display = "none";
    console.log(event);
  }

  showHome() {
    document.getElementById('group').style.display = "";
    document.getElementById('posts').style.display = "none";
    document.getElementById('activities').style.display = "none";
  
  }

  showPosts() {
    document.getElementById('group').style.display = "none";
    document.getElementById('posts').style.display = "";
    document.getElementById('activities').style.display = "none";
   

  }

  showActivities() {
    document.getElementById('group').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('activities').style.display = "";
   
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  viewPost(id){
    this.navCtrl.push('PostsPage', {
      id: id.id
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  Leave(){
    console.log(this.group.group_id);
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      duration: 5000,
      
    });
    loader.present();

    var url = this.api + 'member_leave/'  + this.group.group_id +'/'+this.customer_id;
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
        localStorage.setItem('interest', JSON.stringify(data['interest']));
      let alert = this.alertCtrl.create({
          message: '<img src="assets/images/smileys/sad.png" class="emoji-align" /><p class="emoji-text">We’re sad to see you leave the ' + this.group.name + ' Group. ' + 'Feel free to re-join if you change your mind.</p>',
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
      } else if (data['error'] == true) {
        loader.dismiss();
        localStorage.setItem('interest', JSON.stringify(data['interest']));
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
        return; 
      }
    });
  }

  Join(){
    console.log(this.group.group_id);
    const loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
      duration: 5000,
     
    });
    loader.present();

    var url = this.api + 'member_join/' + this.group.group_id + '/' + this.customer_id ;
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      if (data['error'] == false){
        loader.dismiss();
        localStorage.setItem('interest', JSON.stringify(data['interest']));
      let alert = this.alertCtrl.create({
          
          message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">Welcome to the ' + this.group.name + ' Group. ' + 'Please, stay tuned for all the fun that’s yet to come.</p>',
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
      } else if (data['error'] == true) {
        loader.dismiss();
        localStorage.setItem('interest', JSON.stringify(data['interest']));
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
      }
    });


  }

}
