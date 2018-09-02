import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { AppSettings } from '../../../app/appSettings';

@IonicPage()
@Component({
    selector: 'maps-layout-2',
    templateUrl: 'maps.html'
})
export class MapsLayout2 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;
    base_url: any = "";

    active: boolean;

    constructor(public navCtrl: NavController, public launchNavigator: LaunchNavigator) {
        this.base_url = AppSettings.BASE_URL;
     }

    onEvent(event: string) {
        if (this.events[event]) {
            this.events[event]();
        }
        console.log(event);
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.subscribeToIonScroll();
    }

    ngAfterViewInit() {
        this.subscribeToIonScroll();
    }

    ngAfterViewChecked() {
        this.subscribeToIonScroll();
    }

    isClassActive() {
        return this.active;
    }

    subscribeToIonScroll() {
        if (this.content != null && this.content.ionScroll != null) {
            this.content.ionScroll.subscribe((d) => {
                if (d.scrollTop < 200 ) {
                    this.active = false;
                    return;
                }
                this.active = true;
            });
        }
    }

    callWithNumber(mobileNumber) {
        window.open("tel:" + mobileNumber);
    }


    redeemOffer(offer) {
        console.log(offer);
        this.navCtrl.push('RedeemOffersPage', {
            name: offer,
            nav: true
        });

    }

    openMap(lat, long) {

        var app = this.launchNavigator.APP.USER_SELECT;

        this.launchNavigator.navigate([lat, long], {
            app: app
        })
            .then(
                success => console.log('Launched navigator'),
                error => console.log('Error launching navigator', error)
            );
    }

    redeemOfferMerchant(id) {
        this.navCtrl.push('RedeemMerchantOffersPage', {
            id: id,
            nav: true
        })
    }
}
