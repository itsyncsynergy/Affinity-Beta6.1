import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ActionSheetController  } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
import { AuthService } from '../../services/authservice';
import { CustomerService } from '../../services/customer.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';


/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  
  api:string;
  active: boolean;
  data: any;
  events: any;
  profile_segment: string
  base_url: any = "";
  pic: any;
  redemption: any;
  interest: any;
  activities: any;
  subscription: any;
  membership: any;
  customer_id: any;
  username: any;
  firstname: any;
  lastname:any;
  item:any;
  customer: any;

  details: any;

  imageURI:any;
  imageFileName:any;

  private profile:  FormGroup;
  private form: FormGroup;
  myphoto:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private alertCtrl: AlertController,public authservice: AuthService,public storage: Storage,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, private formBuilder: FormBuilder,
    private file: File, 
    public customerService: CustomerService,
    public actionSheetCtrl: ActionSheetController,
    private location: Location ) {
    this.customer_id = localStorage.getItem('customer_id');

      
    this.profile_segment = 'interest';
    this.base_url = AppSettings.BASE_URL;
    this.api = AppSettings.API_ENDPOINT;
    var user_name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    var avatar = localStorage.getItem('avatar');
    
    // localStorage.getItem('avatar');
    
    this.redemption = JSON.parse(localStorage.getItem('redemption') || null);
    this.interest = JSON.parse(localStorage.getItem('interest') || null);
    this.activities = JSON.parse(localStorage.getItem('activities') || null);
    this.subscription = JSON.parse(localStorage.getItem('subscription') || null);
    this.membership = localStorage.getItem('membership');
    
    this.username = localStorage.getItem('username');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');

    console.log(this.subscription.expiry_message)

    this.data = {
      "avatar": avatar,
      "headerImage": "assets/images/background/1.jpg",
      "headerTitle": "Profile",
      "redemptions": this.redemption,
      "activities": this.activities,
      "subscription": this.subscription,
      "membership": this.membership,
      "interests": this.interest,
      "title": user_name,
      "customer_id": this.customer_id,
      "username": this.username,
      "firstname": this.firstname,
      "lastname": this.lastname
    }

    this.profile = this.formBuilder.group({
      customer_id: [localStorage.getItem('customer_id'), Validators.required],
      username: [this.data.username, Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      newpass: ['', [Validators.required, Validators.minLength(6)]],
      confirmpass: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  editProfile(){
    console.log('got here');

    var url = this.api + 'auth/edit_profile';

    this.data = this.http.post(url, this.profile.value);
    this.data.subscribe(data => {
      if (data['code'] == 502){
       let alert = this.alertCtrl.create({
          title: 'Message',
          message: 'Password Do Not Match',
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
      else if(data['code'] == 200){
        let alert = this.alertCtrl.create({
          title: 'Message',
          message: 'Your Profile has been Updated Successfully',
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

  upload(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Image Source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraUpload();
          }
        },{
          text: 'Gallery',
          handler: () => {
            this.galleryUpload();
          }
        }
      ]
    });
    actionSheet.present();
  }

  cameraUpload() {
     let options = {
         quality: 100,
         destinationType: this.camera.DestinationType.FILE_URI,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then((imageData) => {
 
        this.myphoto = 'data:image/jpeg;base64,' + imageData;
          const fileTransfer: FileTransferObject = this.transfer.create();
            let options1: FileUploadOptions = {
              fileKey: 'file',
              fileName: 'name.jpg',
              chunkedMode: false,
              mimeType: "image/jpeg",
              headers: {}
            }

          var url = this.api + 'auth/changepic/' + this.customer_id;
          const loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
          });
          loader.present();
          fileTransfer.upload(this.myphoto, url, options1)
            .then((data) => {
              console.log(data['response']);
              this.item = data['response'];
              this.customerService.getList('customer_details/' + this.customer_id).subscribe(response => {
                this.details = response;
                console.log(this.details.avatar);
                window.localStorage.setItem('avatar', this.details.avatar);
                console.log(localStorage.getItem('avatar') + 'Image path from localhost');
                // alert("Profile Uploaded");
                // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                loader.dismiss();
                  let alert = this.alertCtrl.create({
                    message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">Profile Picture Changed</p>',
                    buttons: [{
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }] 
                  });
                  alert.present();
              });
              
            
            }, (err) => {

              alert("error"+JSON.stringify(err));
          
            });
      });
  }

  galleryUpload(){
        let options = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          // encodingType: this.camera.EncodingType.JPEG,
          // mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum: false
        };

        this.camera.getPicture(options).then((imageData) => {
 
          this.myphoto = 'data:image/jpeg;base64,' + imageData;
            const fileTransfer: FileTransferObject = this.transfer.create();
              let options1: FileUploadOptions = {
                fileKey: 'file',
                fileName: 'name.jpg',
                chunkedMode: false,
                
                headers: {}
              }
              const loader = this.loadingCtrl.create({
                spinner: 'hide',
                content: '<img src="assets/images/logo/icon.gif" class="img-align" />'
              });
              loader.present();
            var url = this.api + 'auth/changepic/' + this.customer_id;

  
            fileTransfer.upload(this.myphoto, url, options1)
              .then((data) => {
                console.log(data['response']);
                this.item = data['response'];
                this.customerService.getList('customer_details/' + this.customer_id).subscribe(response => {
                  this.details = response;
                  console.log(this.details.avatar);
                  window.localStorage.setItem('avatar', this.details.avatar);
                  console.log(localStorage.getItem('avatar') + 'Image path from localhost');
                  
                  loader.dismiss();
                  let alert = this.alertCtrl.create({
                    message: '<img src="assets/images/smileys/happy.png" class="emoji-align" /><p class="emoji-text">Profile Picture Changed</p>',
                    buttons: [{
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }] 
                  });
                  alert.present();
                 
                });
                
              
              }, (err) => {
  
                alert("error"+JSON.stringify(err));
            
              });
        });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
