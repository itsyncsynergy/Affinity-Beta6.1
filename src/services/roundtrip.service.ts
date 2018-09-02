import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';

@Injectable()
export class RoundtripService{

  api : string;

  constructor(public http: Http) {
    this.http = http;
    this.api = AppSettings.API_ENDPOINT;
  }

  sendRoundTrip(roundTrip){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.api+'roundTrip/store', JSON.stringify(roundTrip), {headers: headers})
      .map(res => res.json());

  }



}
