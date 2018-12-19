import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

@IonicPage()
@Component({
    selector: 'sub-image-gallery',
    templateUrl: 'sub-image-gallery.html'
})
export class SubImageGallery {

    @Input() data: any;
    @Input() events: any;
    base_url: any = ""

    constructor(public navCtrl: NavController, navParams: NavParams) {
        this.base_url = AppSettings.BASE_URL;
     }

    onEvent = (event: string, item, e): void => {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    openImageSlider = (group: any, index: number): any => {
        this.navCtrl.push(group.fullscreen, {
            'group': group.items,
            'index': index
        });
    }
}
