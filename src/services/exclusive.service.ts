import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';

@Injectable()
export class ExclusiveService{

  api : string;

  constructor(public http: Http) {
    this.http = http;
    this.api = AppSettings.API_ENDPOINT;
  }

  getExclusiveOffers(){
    return this.http.get(this.api+'merchants/exclusiveOffers')
      .map(res => res.json());
  }

  getExclusiveOfferByCategory(category_id){
    return this.http.get(this.api+'merchants/'+ category_id + '/categories')
      .map(res => res.json());
  }



}
