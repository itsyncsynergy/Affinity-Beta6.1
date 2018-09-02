import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../app/appSettings';


@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;

    api : string;


    constructor(public http: HttpClient) {
      //  this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
        this.api = AppSettings.API_ENDPOINT;
    }

    storeUserCredentials(token) {
        window.localStorage.setItem('credentials', token);
        this.useCredentials(token);

    }

    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    loadUserCredentials() {
        var token = window.localStorage.getItem('credentials');
        this.useCredentials(token);
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }

    authenticate(user) {
        var  headers = new HttpHeaders({
        'Content-Type':  'application/json'

        });
        var url = this.api + 'auth/login';
       // var headers = new Headers();
       // headers.append('Content-Type', 'application/json');     
       //console.log( this.http.post(this.api+'login', JSON.stringify(user), {headers: headers}));
        var loginResult = this.http.post(url, JSON.stringify(user), { headers: headers });
        
        return loginResult;
    }

    register(user) {
        console.log('got here')
        var headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        var url = this.api + 'auth/signup';
        var signupResult = this.http.post(url, JSON.stringify(user), { headers: headers });

        return signupResult;
    }

    verification(user){
        var headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        var url = this.api + 'auth/verify_code';
        var verifyResult = this.http.post(url, JSON.stringify(user), { headers: headers });

        return verifyResult;
    }

  private extractObject(res: Response): Object {
    const data: any = res.json();
    return data || {};
  }

    logout() {
        this.destroyUserCredentials();
    }
}

