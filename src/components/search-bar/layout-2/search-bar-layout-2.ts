import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { AppSettings } from "../../../app/appSettings";

import { ConferenceData } from '../../../providers/conference-data';
import { UserData } from '../../../providers/user-data';

@IonicPage()
@Component({
  selector: 'search-bar-layout-2',
  templateUrl: 'search-bar.html'
})

export class SearchBarLayout2 {
  @Input() data: any;
  @Input() events: any;

  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  user_image_link: any;

  base_url: any = "";
  searchTerm: any = "";
  allItems: any;

  constructor(public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData) {
      this.base_url = AppSettings.BASE_URL;
      this.user_image_link = this.base_url + localStorage.getItem('avatar');
   }

  getItems(event: any): void {
    if (!this.allItems) {
      this.allItems = this.data.items;
    }
    this.data.items = this.allItems.filter((item) => {
      return item.cate_title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  onEvent(event: string, item: any) {//ITEM [EVENT OR SELECTED ITEM]
    if (this.events[event]) {
      if ('onTextChange' === event) {
        this.getItems(item);
        this.events[event](this.searchTerm);
      } else {
        this.events[event](item);
      }
    }
    console.log(event);
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create('ProfilePage', this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  logout() {
    console.log('Am in here');
    localStorage.clear();
    this.navCtrl.setRoot('WelcomeWizardPage');
  }
}
