import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CustomerService } from "../../services/customer.service";

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  params: any = {}
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, public loadingCtrl: LoadingController) {
    let items = [];

    this.customerService.getList('shop_categories').subscribe(response => {

      items = response;
      this.params.data = {
        "headerTitle": "Luxe Shop",
        // "items": items
        "items": [
          {
            "id": 1,
            "category_id": 1,
            "cate_title": "Accessories & Jewellery",
            "link": 'ProductCategoriesPage',
            "subtitle": "apartments",
            "image": "assets/images/background/luxe_shop/accessories_jewellery.jpg"
          },
          {
            "id": 2,
            "category_id": 2,
            "cate_title": "Art & Decor",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/art_décor.jpeg"
          },
          {
            "id": 3,
            "category_id": 3,
            "cate_title": "Beauty",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/beauty.jpeg"
          },
          {
            "id": 4,
            "category_id": 4,
            "cate_title": "Gifts & Hampers",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/gifts_hampers.jpg"
          },
          {
            "id": 5,
            "category_id": 5,
            "cate_title": "Leather Goods",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/leather_goods.jpg"
          },
          {
            "id": 6,
            "category_id": 6,
            "cate_title": "Tech",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/tech.jpeg"
          },
          {
            "id": 7,
            "category_id": 7,
            "cate_title": "Watches",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/watches.jpeg"
          },
          {
            "id": 8,
            "category_id": 8,
            "cate_title": "Wines & Confectioneries",
            "link": 'ProductCategoriesPage',
            "subtitle": "",
            "image": "assets/images/background/luxe_shop/wines_confectioneries.jpeg"
          }
        ]
      }
    })
    this.params.events = {
      'onTextChange': function (text: any) {
        console.log("onTextChange");
      },
      'onItemClick': function (category_id) {
        console.log(category_id);
        navCtrl.push('ProductCategoriesPage', {
          id: category_id.id,
          title: category_id.cate_title
        })
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true
    });
    //this.loading.present();
  }

}
