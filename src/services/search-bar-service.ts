import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class SearchBarService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) {}

    getId = (): string => 'searchBars';

    getTitle = (): string => 'Search bars';

    getAllThemes = (): Array<any> => {
        return [
          {"title" : "Simple", "theme"  : "layout1"},
          {"title" : "Field + header", "theme"  : "layout2"},
          {"title" : "Field + header 2", "theme"  : "layout3"}
        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // SEARCH - Simple data
     getDataForLayout1 = (): any => {
         return {
             "headerTitle": "Simple",
             "items": [
                 {
                     "title": "Friends",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/1.jpg"
                 },
                 {
                     "title": "Enemies",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/2.jpg"
                 },
                 {
                     "title": "Neutral",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/3.jpg"
                 },
                 {
                     "title": "Family",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/4.jpg"
                 },
                 {
                     "title": "Guests",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/5.jpg"
                 },
                 {
                     "title": "Students",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/6.jpg"
                 },
                 {
                     "title": "Friends",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/7.jpg"
                 },
                 {
                     "title": "Enemies",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/8.jpg"
                 },
                 {
                     "title": "Neutral",
                     "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                     "image": "assets/images/background/9.jpg"
                 }
             ]
         };
    };

    // SEARCH - Field + header data
    getDataForLayout2 = (): any => {
        return {
            "headerTitle": "Field + header",
            "title": "Just type",
            "headerImage": "assets/images/background/1.jpg",
            "items": [
                {
                    "title": "iPhone 8",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/1.jpg",
                    "button": "BUY"
                },
                {
                    "title": "500+",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/2.jpg",
                    "button": "BUY"
                },
                {
                    "title": "Watch Black",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/3.jpg",
                    "button": "BUY"
                },
                {
                    "title": "Canon Photoaparat",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/4.jpg",
                    "button": "BUY"
                },
                {
                    "title": "50mm",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/5.jpg",
                    "button": "BUY"
                },
                {
                    "title": "Nikon Photoaparat",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/6.jpg",
                    "button": "BUY"
                },
                {
                    "title": "Sony PS 4",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/7.jpg",
                    "button": "BUY"
                },
                {
                    "title": "Watch New",
                    "subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "avatar": "assets/images/avatar/8.jpg",
                    "button": "BUY"
                }
            ]
        };
    };

    // SEARCH - Field + header 2 data
    getDataForLayout3 = (): any => {
        return {
            "headerTitle": "Field + header 2",
            "title": "Search Friends",
            "items": [
                {
                    "id": 1,
                    "title": "Justine Robinson",
                    "subtitle": "@justine",
                    "detail": "Berlin",
                    "avatar": "assets/images/avatar/22.jpg"
                },
                {
                    "id": 2,
                    "title": "Ruben Escribano",
                    "subtitle": "@ruben",
                    "detail": "Casablanca",
                    "avatar": "assets/images/avatar/23.jpg"
                },
                {
                    "id": 3,
                    "title": "Abbie Wilson",
                    "subtitle": "@abbie453",
                    "detail": "Cape Town",
                    "avatar": "assets/images/avatar/24.jpg"
                },
                {
                    "id": 4,
                    "title": "Laura Sarabia",
                    "subtitle": "@laura",
                    "detail": "New Taipei City",
                    "avatar": "assets/images/avatar/19.jpg"
                },
                {
                    "id": 5,
                    "title": "Lizzie Rose",
                    "subtitle": "@lizzie",
                    "detail": "Jakarta",
                    "avatar": "assets/images/avatar/20.jpg"
                },
                {
                    "id": 6,
                    "title": "Fernando Villegas",
                    "subtitle": "@fernando",
                    "detail": "São Paulo",
                    "avatar": "assets/images/avatar/21.jpg"
                },
                {
                    "id": 7,
                    "title": "Theresa Stewart",
                    "subtitle": "@theresa",
                    "detail": "Guangzhou",
                    "avatar": "assets/images/avatar/16.jpg"
                },
                {
                    "id": 8,
                    "title": "Helena Scott",
                    "subtitle": "@helena44",
                    "detail": "Shanghai",
                    "avatar": "assets/images/avatar/17.jpg"
                }
            ]
        };
    }

    getEventsForTheme = (menuItem: any): any => {
      var that = this;
        return {
            'onTextChange': function(text: any) {
                  that.toastCtrl.presentToast(text);
            },
            'onItemClick': function(item: any) {
                  that.toastCtrl.presentToast(item.title);
            }
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
                    .object('searchBars/' + item.theme)
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
