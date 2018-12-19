import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController , Loading, ViewController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';


/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  data: any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  headerImage: string;
  posts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
    
    this.showLoading()
    console.log(navParams.data.id)

    this.customerService.getList('get_post/' + navParams.data.id).subscribe(response => {
      console.log(response);
      this.posts = response;
      this.headerImage = this.posts.avatar;

      this.data = {
        "headerTitle": this.posts.title,
        "headerImage": this.headerImage,
        "title": this.posts.title,
        "post": this.posts.post,
        "group_name": this.posts.name,
        "date": this.posts.created_at

      }

      this.loading.dismiss();

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}
