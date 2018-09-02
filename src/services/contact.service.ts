import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';

@Injectable()
export class ContactService{

  api : string;

  constructor(public http: Http) {
    this.http = http;
    this.api = AppSettings.API_ENDPOINT;
  }

  sendContact(contact){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.api+'contactus/store', JSON.stringify(contact), {headers: headers})
      .map(res => res.json());

  }



}
