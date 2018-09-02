import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AffinityApp } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';
import { AppSettings } from '../services/app-settings';



//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

//services
import { AuthService } from "../services/authservice";
import { CustomerService } from "../services/customer.service";
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { BackbuttonService } from "../services/backbutton.service";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LoadingService } from '../services/loading-service';
import { MerchantService } from '../services/merchant.service';
import { TransactionService } from '../services/transaction.service';
import { SelectSearchableModule } from '../../node_modules/ionic-select-searchable';
import { InterestService } from '../services/interest.service';


@NgModule({
  declarations: [
    AffinityApp
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    BrowserModule,
    MbscModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SelectSearchableModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(AffinityApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'push',
        },
        andriod: {
          menuType: 'push',
        }
      }
    }),
    AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
    AngularFireDatabaseModule, AngularFireAuthModule, AngularFirestoreModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AffinityApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CustomerService,
    HttpClient,
    ConferenceData,
    UserData,
    InAppBrowser,
    LaunchNavigator,
    BackbuttonService,
    BarcodeScanner,
    MerchantService,
    TransactionService,
    LoadingService,
    InterestService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
