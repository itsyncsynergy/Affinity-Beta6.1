import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class ListViewGoogleCardsService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'googleCards';

    getTitle = (): string => 'Google Cards';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Full image cards", "theme"  : "layout1"},
          {"title" : "Styled cards 2", "theme"  : "layout2"},
          {"title" : "Styled cards", "theme"  : "layout3"}
        ];
    };

    // GOOGLE CARD - Full image cards data
    getDataForLayout1 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "title": "Free Ride",
                    "backgroundImage": "assets/images/background/2.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 2,
                    "title": "Bridge Tour",
                    "backgroundImage": "assets/images/background/5.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 3,
                    "title": "Sea Tour",
                    "backgroundImage": "assets/images/background/21.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 4,
                    "title": "Main Stage Event",
                    "backgroundImage": "assets/images/background/7.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 5,
                    "title": "Classic Open Air",
                    "backgroundImage": "assets/images/background/11.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 6,
                    "title": "Concert Summer",
                    "backgroundImage": "assets/images/background/14.jpg",
                    "description": "LCras odio felis, blandit sit amet mi nec, euismod mattis tellus."
                },
                {
                    "id": 7,
                    "title": "Open Air Concerts",
                    "backgroundImage": "assets/images/background/10.jpg",
                    "description": "Cras odio felis, blandit sit amet mi nec, euismod mattis tellus.."
                }
            ]
        };
    };

    // GOOGLE CARD - Styled cards 2 data
    getDataForLayout2 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "title": "Digital Watch",
                    "subtitle": "Category: Watch",
                    "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
                    "image": "assets/images/background/6.jpg",
                    "price": "$144.50",
                    "button": "Buy",
                    "shareIcon": "more"
                },
                {
                    "id": 2,
                    "title": "Android Watch",
                    "subtitle": "Category: Watch",
                    "description": "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words",
                    "image": "assets/images/background/9.jpg",
                    "price": "$130.99",
                    "button": "Buy",
                    "shareIcon": "more"
                },
                {
                    "id": 3,
                    "title": "Acoustic Guitars",
                    "subtitle": "Category: Guitars",
                    "description": "Icero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum",
                    "image": "assets/images/background/10.jpg",
                    "price": "$354.05",
                    "button": "Buy",
                    "shareIcon": "more"
                },
                {
                    "id": 4,
                    "title": "Bass guitar",
                    "subtitle": "Category: Guitars",
                    "description": "Here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
                    "image": "assets/images/background/13.jpg",
                    "price": "$338.99",
                    "button": "Buy",
                    "shareIcon": "more"
                },
                {
                    "id": 5,
                    "title": "Classical guitar",
                    "subtitle": "Category: Guitars",
                    "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
                    "image": "assets/images/background/15.jpg",
                    "price": "$109.60",
                    "button": "Buy",
                    "shareIcon": "more"
                }
            ]
        };
    };

    // GOOGLE CARD - Styled cards data
    getDataForLayout3 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "category": "best offer",
                    "image": "assets/images/background/11.jpg",
                    "title": "Free Ride Tour",
                    "subtitle": "West Avenue, NYC",
                    "button": "$135.99"
                },
                {
                    "id": 2,
                    "category": "main event",
                    "image": "assets/images/background/14.jpg",
                    "title": "Open Air Concert",
                    "subtitle": "Hyde Park, London",
                    "button": "$312.99"
                },
                {
                    "id": 3,
                    "category": "Best Tourt",
                    "image": "assets/images/background/21.jpg",
                    "title": "Sea ture",
                    "subtitle": "Guilin, Kweilin",
                    "button": "$213.45"
                },
                {
                    "id": 4,
                    "category": "Mountain",
                    "image": "assets/images/background/7.jpg",
                    "title": "Mountain Trout",
                    "subtitle": "Mountain Trout Camp",
                    "button": "$338.60"
                },
                {
                    "id": 5,
                    "category": "Bridge Tour",
                    "image": "assets/images/background/5.jpg",
                    "title": "Bridge Tour",
                    "subtitle": "BridgeClimb, Sydney",
                    "button": "$410.85"
                },
                {
                    "id": 6,
                    "category": "best events",
                    "image": "assets/images/background/2.jpg",
                    "title": "Main Stage Event",
                    "subtitle": "Hyde Park, London ",
                    "button": "$516.55"
                }
            ]
        };
    }

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onItemClick': function(item: any) {
                  that.toastCtrl.presentToast(item.title);
            },
            'onShare': function(item: any) {
                  that.toastCtrl.presentToast("Share");
            },
        };
    };



    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: [],
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    };

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('listView/googleCards/' + item.theme)
                    .valueChanges()
                    .subscribe(snapshot => {
                        that.loadingService.hide();
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        that.loadingService.hide();
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                that.loadingService.hide();
                observer.next(this.getDataForTheme(item));
                observer.complete();
            });
        }
    }
}
