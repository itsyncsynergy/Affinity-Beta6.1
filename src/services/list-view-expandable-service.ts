import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { ToastService } from './toast-service'
import { LoadingService } from './loading-service'
@Injectable()
export class ListViewExpandableService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'expandable';

    getTitle = (): string => 'Expandable';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "List big image", "theme": "layout1" },
            { "title": "Full image with CTA", "theme": "layout2" },
            { "title": "Filters products", "theme": "layout3" }

        ];
    };

    getDataForTheme = (menuItem: any): Array<any> => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    // EXPANDABLE -  List big image data
    getDataForLayout1 = (): any => {
        return {
            "header": "Catalogue",
            "items": [
                {
                    "id": 1,
                    "title": "Nikon",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/0.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$399.99"
                        },
                        {
                            "id": 2,
                            "title": "Nikon Photoaparat",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/6.jpg",
                            "details": "$2058.99"
                        },
                        {
                            "id": 3,
                            "title": "Objective",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/5.jpg",
                            "details": "$89.99"
                        },
                        {
                            "id": 4,
                            "title": "Canon Photoaparat",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/4.jpg",
                            "details": "$1999.99"
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "500+",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/2.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "Watch black",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/3.jpg",
                            "details": "$99.99"
                        },
                        {
                            "id": 2,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$499.99"
                        },
                        {
                            "id": 3,
                            "title": "iPhone 8 Plus",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/1.jpg",
                            "details": "$1199.99"
                        },
                        {
                            "id": 4,
                            "title": "Canon Photoaparat",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/0.jpg",
                            "details": "$798.99"
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "Canon Photoaparat",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/4.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "500+",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/2.jpg",
                            "details": "$589.99"
                        },
                        {
                            "id": 2,
                            "title": "Nikon Photoaparat",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/4.jpg",
                            "details": "$799.99"
                        },
                        {
                            "id": 3,
                            "title": "Objective",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/6.jpg",
                            "details": "$99.99"
                        },
                        {
                            "id": 4,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$599.99"
                        }
                    ]
                },
                {
                    "id": 4,
                    "title": "iPhone 8 Plus",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/1.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "Canon Photoaparat",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/4.jpg",
                            "details": "$412.99"
                        },
                        {
                            "id": 2,
                            "title": "Watch black",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/3.jpg",
                            "details": "$657.99"
                        },
                        {
                            "id": 3,
                            "title": "50mm",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/5.jpg",
                            "details": "$58.99"
                        },
                        {
                            "id": 4,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$856.99"
                        }
                    ]
                },
                {
                    "id": 5,
                    "title": "50mm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/5.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "Nikon",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/6.jpg",
                            "details": "$999.99"
                        },
                        {
                            "id": 2,
                            "title": "Watch black",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/3.jpg",
                            "details": "$299.99"
                        },
                        {
                            "id": 3,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$658.99"
                        },
                        {
                            "id": 4,
                            "title": "500+",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/2.jpg",
                            "details": "$158.99"
                        }
                    ]
                },
                {
                    "id": 6,
                    "title": "Nikon Photoaparat",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "image": "assets/images/avatar/6.jpg",
                    "expandItems": [
                        {
                            "id": 1,
                            "title": "iPhone 8 Plus",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/1.jpg",
                            "details": "$1008.99"
                        },
                        {
                            "id": 2,
                            "title": "50mm",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/5.jpg",
                            "details": "$258.99"
                        },
                        {
                            "id": 3,
                            "title": "500+",
                            "description": "Lorem ipsum.",
                            "image": "assets/images/avatar/2.jpg",
                            "details": "$628.99"
                        },
                        {
                            "id": 4,
                            "title": "Sony PC",
                            "description": "Lorem ipsum",
                            "image": "assets/images/avatar/7.jpg",
                            "details": "$580.99"
                        }
                    ]
                }
            ]
        };
    };

    // EXPANDABLE - Full image with CTA data
    getDataForLayout2 = (): any => {
        return {
            "items": [
                {
                    "id": 1,
                    "title": "Open Air Concerts",
                    "subtitle": "Monday, 15th Oct. 2018",
                    "backgroundImage": "assets/images/background/11.jpg",
                    "icon": "ios-arrow-dropright",
                    "iconText": "Watch now",
                    "expandItems": {
                        "iconsStars": [
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": false,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            }
                        ],
                        "reviews": "4.12 (78 reviews)",
                        "title": "Lorem ipsum dolor sit amet",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    }
                },
                {
                    "id": 2,
                    "title": "Concert Summer",
                    "subtitle": "Wendsday, 21st Oct. 2018",
                    "backgroundImage": "assets/images/background/14.jpg",
                    "icon": "ios-arrow-dropright",
                    "iconText": "Watch now",
                    "expandItems": {
                        "iconsStars": [
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": false,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            }
                        ],
                        "reviews": "4.12 (78 reviews)",
                        "title": "Lorem ipsum dolor sit amet",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    }
                },
                {
                    "id": 3,
                    "title": "Summer Open Air Festival",
                    "subtitle": "Wendsday, 21st Oct. 2018",
                    "backgroundImage": "assets/images/background/13.jpg",
                    "icon": "ios-arrow-dropright",
                    "iconText": "Watch now",
                    "expandItems": {
                        "iconsStars": [
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": false,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            }
                        ],
                        "reviews": "4.12 (78 reviews)",
                        "title": "Lorem ipsum dolor sit amet",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    }
                },
                {
                    "id": 4,
                    "title": "Classic Open Air",
                    "subtitle": "Wendsday, 21st Oct. 2018",
                    "backgroundImage": "assets/images/background/10.jpg",
                    "icon": "ios-arrow-dropright",
                    "iconText": "Watch now",
                    "expandItems": {
                        "iconsStars": [
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": true,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            },
                            {
                                "isActive": false,
                                "iconActive": "icon-star",
                                "iconInactive": "icon-star-outline"
                            }
                        ],
                        "reviews": "4.12 (78 reviews)",
                        "title": "Lorem ipsum dolor sit amet",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    }
                }
            ]
        }
    };

    // EXPANDABLE - Filters products
    getDataForLayout3 = (): any => {
        return {
            "header": "Popular Car",
            "button": "CHOOSE",
            "items": [
                {
                    "id": 1,
                    "title": "Tesla Model S",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 2,
                    "title": "Toyota RAV4",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 3,
                    "title": "Audi Q5",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 4,
                    "title": "BMW 3 Series",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 5,
                    "title": "Audi Q7",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 6,
                    "title": "Subaru Impreza",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 7,
                    "title": "BMW X5",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 8,
                    "title": "Hyundai Tucson",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 9,
                    "title": "Lexus RX 350",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 10,
                    "title": "Jeep Wrangler",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                },
                {
                    "id": 11,
                    "title": "Subaru Outback",
                    "icon": "icon-chevron-right",
                    "expandItems": [
                      {
                          "title": "year",
                          "isChecked": "true"
                      },
                      {
                          "title": "price",
                          "isChecked": "true"
                      },
                      {
                          "title": "fuel",
                          "isChecked": "false"
                      },
                      {
                          "title": "color",
                          "isChecked": "false"
                      },
                      {
                          "title": "horse power",
                          "isChecked": "false"
                      }
                    ]
                }
            ]
        };
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onItemClick': function (item: any) {
                  that.toastCtrl.presentToast(item.title);
            },
            'onRates': function (index: number) {
                  that.toastCtrl.presentToast("Rates " + (index + 1));
            },
            'onCheckBoxClick': function (item: any) {
                  that.toastCtrl.presentToast(item.title);
            },
            'onButtonClick': function (item: any) {
                  that.toastCtrl.presentToast("Refine");
            }
        };
    };

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: this.getDataForTheme(item),
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    }

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('listView/expandable/' + item.theme)
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
