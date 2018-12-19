import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  headerImage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, private inAppBrowser: InAppBrowser, public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
    console.log(navParams.data.id);
      this.base_url = AppSettings.BASE_URL;
      this.user_image_link = this.base_url + localStorage.getItem('avatar');

      this.showLoading()

      this.customerService.getList('feed/' + navParams.data.id).subscribe(response => {
       
        this.headerImage = response.feed.avatar;
        console.log(response);

        this.data = {
          
          'headerTitle': response.feed.title,
          'avatar': response.feed.avatar,
          'url': response.feed.url,
          'post': response.feed.post,
          'created_at': response.feed.created_at,
          'updated_at': response.feed.updated_at,
          'summary': response.feed.summary
          
        }

        this.loading.dismiss();
      })

  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  share(url, title, avatar) {
    console.log(url, title, avatar);
    this.socialSharing.share(title, avatar, url).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  readMore(id){
    console.log(id);

    const browser = this.inAppBrowser.create(id, '_blank', 'location=yes,allowInlineMediaPlayback=yes,hardwareback=yes,presentationstyle=pagesheet,shouldPauseOnSuspend=yes,hideurlbar=yes,closebuttoncaption=Close');
    
    browser.on('exit').subscribe(() => {
      console.log('Exit button pressed')
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
