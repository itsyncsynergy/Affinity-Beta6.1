import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ModalController  } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the AttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attend',
  templateUrl: 'attend.html',
})
export class AttendPage {
  params: any = {};
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    

    let items = [];
    this.showLoading()
    this.customerService.getList('events').subscribe(response => {
      items = response;
      this.data = {
        "headerTitle": "Attend",
        "items": response.event
        
      }
      this.loading.dismiss();
    })


    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      
    }
  }

  ionViewDidEnter(){
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
  }

  onItemClick(category_id) {
    console.log(category_id);
   this.navCtrl.push('EventPage', {
      id: category_id.id,
      title: category_id.cate_title
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendPage');
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  swipe(event) {
    if(event.direction == 2) {
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4) {
      this.navCtrl.parent.select(1);
    }
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

}