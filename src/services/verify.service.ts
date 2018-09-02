import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';

@Injectable()
export class VerifyService{

  api : string;

  constructor(public http: Http) {
    this.http = http;
    this.api = AppSettings.API_ENDPOINT;
  }



  verifyUser(user) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.api+'user/verifyUser', JSON.stringify(user), {headers: headers})
      .map(res => res.json());

  }



}
