import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'

@Injectable()
export class WizardService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) {}

    getId = (): string => 'wizard';

    getTitle = (): string => 'Wizard';

    getAllThemes = (): Array<any> => {
        return [
            {"title" : "Simple + image", "theme"  : "layout1"},
            {"title" : "Big image", "theme"  : "layout2"},
            {"title" : "Big Image + Text", "theme"  : "layout3"}
        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

 // WIZARD - Simple + image data
 getDataForLayout1 = (): any => {
     return {
         "btnPrev": "Previous",
         "btnNext": "Next",
         "btnFinish": "Finish",
         "items": [
             {
                "backgroundImage": "assets/images/background/28.jpg",
                 "logo": "assets/images/logo/1.png",
                 "title": "Aenean feugiat ipsum eget porttitor auctor",
                 "subtitle": "Donec finibus est ac augue feugiat pretium",
                 "description": "Duis gravida, tellus eget condimentum vestibulum, massa metus gravida mauris, elementum sodales nunc tellus ut ligula"
             },
             {
                "backgroundImage": "assets/images/background/29.jpg",
                 "logo": "assets/images/logo/1.png",
                 "title": "Sed sollicitudin tortor id bibendum sollicitudin",
                 "subtitle": "Integer vel mi euismod, egestas neque in, tincidunt tellus",
                 "description": "Donec tincidunt odio eget ante bibendum, eget dapibus mauris hendrerit"
             },
             {
                "backgroundImage": "assets/images/background/30.jpg",
                 "logo": "assets/images/logo/1.png",
                 "title": "In ac tortor in risus commodo molestie",
                 "subtitle": "Pellentesque porttitor turpis eget metus dignissim sollicitudin",
                 "description": "Ut iaculis scelerisque mauris sit amet interdum"
             }
         ]
     };
    };

    // WIZARD - Big image data
    getDataForLayout2 = (): any => {
        return {
            "btnNext": "Next",
            "btnFinish": "Finish",
            "items": [
                {
                    "welcome": "Welcome",
                    "backgroundImage": "assets/images/background/32.jpg",
                    "title": "Welcome to our new iOS theme",
                    "description": "Text for Fragment Example 3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                },
                {
                    "welcome": "Welcome",
                    "backgroundImage": "assets/images/background/26.jpg",
                    "title": "Welcome to our new iOS theme",
                    "description": "Text for Fragment Example 3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                },
                {
                    "welcome": "Welcome",
                    "backgroundImage": "assets/images/background/25.jpg",
                    "title": "Welcome to our new iOS theme",
                    "description": "Text for Fragment Example 3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                }
            ]
        };
    };

    // WIZARD - Big Image + Text
    getDataForLayout3 = (): any => {
        return {
            "btnNext": "Next",
            "btnFinish": "Finish",
            "items": [
                {
                    "backgroundImage": "assets/images/background/30.jpg",
                    "subtitle": "Cosmologist Stephen Hawking",
                    "title": "Happy Anniversary, Juno! NASA Probe Marks 1 Year at Jupiter."
                },
                {
                    "backgroundImage": "assets/images/background/27.jpg",
                    "subtitle": "Bennu is an asteroid",
                    "title": "Colorful Clouds on Jupiter by Juno"
                },
                {
                    "backgroundImage": "assets/images/background/31.jpg",
                    "subtitle": "Light elements clumpeds",
                    "title": "Best Space Stories of The Week!"
                }
            ]
        };
    }

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onFinish': function(event: any) {
                  that.toastCtrl.presentToast("Finish");
            }
        };
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    }

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: this.getDataForTheme(item),
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('wizard/' + item.theme)
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
    };
}
