import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';

/**
 * Generated class for the RentalListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-list',
  templateUrl: 'rental-list.html',
})
export class RentalListPage {

  data: any;
  events: any;
  loading: Loading;
  merchant: any;
  reviews: any;
  base_url: any = ""
  user_image_link: any;
  rental: any;
  gallery: any;
  headerImage: string;

  params: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
   
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');
      let items = [];
      this.showLoading()
      console.log(navParams.data.id);

      this.customerService.getList('rental/' + navParams.data.id).subscribe(response => {
        
        
        this.rental = response['rental'];
        this.gallery = response['gallery'];
        this.headerImage = this.rental.avatar;
        console.log(response);
        this.data = {
          "avatar": this.rental.avatar,
          "headerImage": this.rental.headerImage,
          "headerTitle": this.rental.name,
          "details": this.rental.details,
          "category": navParams.data.cate_title,
          "title": this.rental.name,
          'ntk': this.rental.ntk,
          "price": this.rental.price,
          "curr": this.rental.curr,
          "validity": this.rental.validity,
          'address': this.rental.venue + ", " + this.rental.country,
          //"gallery": this.gallery,
          "gimage": response['gimage'],
          //"items": this.offers,
          "items": [
            {
              "id": 1,
              "title": this.rental.name,
              "subtitle": "View Gallery",
              "image": response['gimage'],
              "items": this.gallery
            }
          ]
        }
        this.loading.dismiss();

        this.data.gallery = {
              "items": [
                  {
                    "id": 1,
                    "title": this.rental.name,
                    "subtitle": "View Gallery",
                    "image": response['gimage'],
                    "items": this.gallery
                  }
              ]
          };

        this.data.gallery.subGallery = "ItemDetailsPageSubImageGallery";
        this.data.gallery.fullscreen = "ItemDetailsPageFullScreenGallery";
      })
    
    

    this.events = {
      'onProceed': function (item: any) {
        console.log("onProceed");
      },
      'onShare': function (item: any) {
        console.log("onShare");
      },
      'onItemClick': function (item: any) {
        console.log("onItemClick");
        navCtrl.push('MerchantOfferPage')
      },
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalListPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  rentalForm() {
    if (this.rental.category == 1)
    {
      console.log('Request button pressed');
      this.navCtrl.push('ApartmentRequestPage',{
        id: this.navParams.data.id,
        category_id: this.rental.category,
        name: this.rental.name
      })

    }else if(this.rental.category == 2)
    {
      console.log('Request button pressed');
      this.navCtrl.push('CarsRequestPage',{
        id: this.navParams.data.id,
        category_id: this.rental.category,
        name: this.rental.name
      })

    }else if(this.rental.category == 3)
    {
      console.log('Request button pressed');
      this.navCtrl.push('HelicopterRequestPage',{
        id: this.navParams.data.id,
        category_id: this.rental.category,
        name: this.rental.name
      })

    }else if(this.rental.category == 4)
    {
      console.log('Request button pressed');
      this.navCtrl.push('BoatRequestPage',{
        id: this.navParams.data.id,
        category_id: this.rental.category,
        name: this.rental.name
      })

    }
    
  }

  openSubGallery = (group: any, index: number): any => {
    this.navCtrl.push(group.subGallery, {
      'group': group.items[index],
      'events': this.events,
      'layout': 1
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/images/logo/icon.gif" class="img-align" />',
    });
    this.loading.present();
  }

}