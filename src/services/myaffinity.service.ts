import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';

@Injectable()
export class MyaffinityService{

  api : string;

  constructor(public http: Http) {
    this.http = http;
    this.api = AppSettings.API_ENDPOINT;
  }



  updateAffinity(user) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.api+'user/updateAffinity', JSON.stringify(user), {headers: headers})
      .map(res => res.json());

  }



}
