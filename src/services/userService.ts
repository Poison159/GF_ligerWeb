import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable()
export class UserService {

    private Url                   = 'https://weboneapp.conveyor.cloud/api';
    private localUrl              = 'https://192.168.8.101:45456/';
    private _localRegisterUrl     = this.Url + '/RegisterUser';
    private _localLoginUrl        = this.Url + '/CheckToken';
    private _localUserDataUrl     = this.Url + '/UserData';
    private _changeNameUrl     = this.Url + '/ChangeName';

    constructor(private _http: HttpClient){}

    registerUser(name:any , email:any, mobileNumber:any, password:any): Observable<any> {
        console.log('Registering user .....');
        return this._http.get<any>(this._localRegisterUrl + '?name=' + name + '&email='
        + email + '&mobileNumber=' + null + '&password=' + password);
    }

    Login(email: string,password: string): Observable<any> {
      return this._http.get<any>(this._localLoginUrl + '?email=' + email + '&password=' + password) ;
    }

    changeName(userId:any, name:any){
      return this._http.get<any>(this._changeNameUrl + '?userId=' + userId + '&name=' + name) ;
    }

}
