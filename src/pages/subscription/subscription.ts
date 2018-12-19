import { Component, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CustomerService } from '../../services/customer.service';
import { AppSettings } from '../../app/appSettings';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  data:any;
  loading: Loading;
  base_url: any = ""
  user_image_link: any;
  customer_id:any;
  public form: FormGroup;

  membership = ['Essence', 'Luxe', 'Premium'];
  planByMembership = {
    Essence: ['Essence_Monthly', 'Essence_Yearly'],
    Luxe: ['Luxe_Monthly', 'Luxe_Yearly'],
    Premium: ['Premium_Monthly', 'Premium_Yearly'],
  };
  priceByMembership = {
    Essence_Monthly: '1000', 
    Essence_Yearly: '10000',
    Luxe_Monthly: '20000',
    Luxe_Yearly: '200000',
    Premium_Monthly: '5000',
    Premium_Yearly: '50000'
    
  };
  
 price = '';
 packages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public http: HttpClient, private formBuilder: FormBuilder, private alertCtrl: AlertController, private _cdr: ChangeDetectorRef) {
    this.customer_id = localStorage.getItem('customer_id');
    
    this.base_url = AppSettings.BASE_URL;
    this.user_image_link = this.base_url + localStorage.getItem('avatar');

    this.data = {
      'headerTitle': 'Subscription'
    }

    this.form = this.formBuilder.group({
        membership: ['', Validators.required],
        price: ['', Validators.required],
        packages:['', Validators.required]
    });
    
  }

  onMemberChange(): void {
    let membership = this.form.get('membership').value;
    this.packages = this.planByMembership[membership];
    this.price = '';
    this._cdr.detectChanges();
  }

  onPlanChange(): void {
    let packages = this.form.get('packages').value;
    this.price = this.priceByMembership[packages];
    this._cdr.detectChanges();
  }

  onSubmit() {

    let membership = this.form.get('membership').value;
    let price = this.form.get('price').value;
    let packages = this.form.get('packages').value;

    if (membership == 'Essence') {

        this.navCtrl.push('EssenceMemberPage', {
          membership: membership,
          price: price,
          plan: packages
        })

    }
    else if (membership == 'Luxe') {

      this.navCtrl.push('LuxeMemberPage', {
          membership: membership,
          price: price,
          plan: packages
      })

    }

    else if (membership == 'Premium') {

      this.navCtrl.push('PremiumMemberPage', {
        membership: membership,
        price: price,
        plan: packages
      })

    }

  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage');
    modal.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

}
