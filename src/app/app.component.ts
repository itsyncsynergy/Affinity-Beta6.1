import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AppSettings } from './appSettings';

export interface PageInterface {
  title: string;
  name: string;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  component: string;

}

@Component({
  templateUrl: 'app.template.html'
})
export class AffinityApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  appPages: PageInterface[] = [
    { title: 'Profile', name: 'ProfileLeftPage', component: 'ProfileLeftPage', icon: 'calendar' },
    { title: 'App Info', name: 'AppInfoPage', component: 'AppInfoPage', icon: 'contacts' },
    { title: 'Terms of Service', name: 'TosPage', component: 'TosPage', icon: 'map' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'FAQ', name: 'FaqPage', component: 'FaqPage', icon: 'person' },
    { title: 'Privacy Policy', name: 'PrivacyPolicyPage', component: 'PrivacyPolicyPage', icon: 'help' },
    { title: 'Contact Us', name: 'ContactPage', component: 'ContactPage', icon: 'log-out', logsOut: true }
  ];
  
  HAS_LOGGED_IN = 'hasLoggedIn';

  //variables
  firstname: String;
  lastname: String;
  username: any;
  membership: any;
  customer: any;
  email: any;
  base_url: any;
  subscriber_avatar: String;
  excludeTracks: any = [];

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  rootPage: string;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController) {
    this.base_url = AppSettings.BASE_URL;
    window.localStorage.setItem('base_url', this.base_url);
    
    this.menu = menu;
    this.menu.enable(false)
    //localStorage.clear();
    // Check if the user has already seen the tutorial
    if (window.localStorage.getItem('loggedIn')) {

      this.customer = localStorage.getItem('customer');
      this.firstname = window.localStorage.getItem('firstname');
      this.lastname = window.localStorage.getItem('lastname');
      this.membership = window.localStorage.getItem('membership');
      if (this.membership === "null" || this.membership == "") {
        this.membership = '';
      }

      this.subscriber_avatar = window.localStorage.getItem('avatar');
      if (this.subscriber_avatar === "null") {
        this.subscriber_avatar = 'images/no_img.png';
      }
      else {
        this.subscriber_avatar = window.localStorage.getItem('avatar');
      }
      console.log(this.customer);
      this.rootPage = "TabsPage";
      this.enableMenu(true);
      this.storage.set(this.HAS_LOGGED_IN, true);

    }
    else {
      this.rootPage = 'WelcomeWizardPage';

    }
    this.platformReady()

    // load the conference data
    confData.load();


    events.subscribe('user:signedIn', (userEventData) => {
      this.subscriber_avatar = userEventData.avatar;
      this.firstname = userEventData.firstname;
      this.membership = userEventData.membership;
    });

    events.subscribe('user:updatedImage', (userEventData) => {
      this.subscriber_avatar = userEventData;
    });

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });


    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.push(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot("TutorialPage");
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  logout() {
    console.log('Am in here');
    localStorage.clear();
    this.storage.set(this.HAS_LOGGED_IN, false);
    this.enableMenu(false);
    this.nav.setRoot('WelcomeWizardPage');
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage', this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        //this.updateSchedule();
      }
    });

  }


}
