import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { conUrl, url } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService implements OnInit {
  private resUrl                      = conUrl +'api/Branches';
  private catUrl                      = conUrl +'api/Categories';
  private searchUrl                   = conUrl +'api/Search';
  private ratinghUrl                  = conUrl +'api/Rating';
  private userRatingsUrl              = conUrl +'api/UserRatings';
  private userReservationsUrl         = conUrl +'api/UserReservations';
  private reservationUrl              = conUrl +'api/Reservation';
  private cancelReservationUrl        = conUrl +'api/cancelReservation';
  
  private latitude                    : any;
  private longitude                   : any;

  constructor(private _http: HttpClient) {
   }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(resp => {

      this.latitude   = resp.coords.longitude, 
      this.longitude  = resp.coords.latitude
    
    },(err) => {
      console.log(err);
    });
  }


  sendReservation(userId:any,branchId:any,mobileNumber:any,quantity:any,dateReserved:any,timeReserved:any){
    console.log(" adding Reservation ...");
    return this._http.get<any>(this.reservationUrl + '?userId=' +userId + '&branchId=' +branchId + '&mobileNumber=' + mobileNumber + 
            '&quantity=' + quantity + '&dateReserved=' + dateReserved + '&timeReserved=' + timeReserved );
  }

  fetchRestaurants(){
    console.log("getting resturants ...");
    return this._http.get<any>(this.resUrl + '?code=');
  }

  fetchCategories(){
    console.log("getting categories ...");
    return this._http.get<any>(this.catUrl);
  }

  getAllResturantsNearMe(lat: string, lon: string){ 
    console.log('getting resturants near you ...');
    return this._http.get<any>(this.resUrl + '?userLocation=' + lon + ',' + lat + "&distance=" + 30);
  }

  serach(searchStr: string){  
    console.log('Serching for resturants ...');
    return this._http.get<any>(this.searchUrl + '?searchStr=' + searchStr);
  }

  addRating(comment:string,userId:any, rating:any, branchId:any){
    console.log('adding rating  ...');
    return this._http.get<any>(this.ratinghUrl + '?userId=' + userId +
     '&userRating=' + rating + '&branchId=' + branchId + '&comment=' + comment);
  }

  getUserRatings(userId:any){
      console.log('adding rating  ...');
      return this._http.get<any>(this.userRatingsUrl + '?userId=' + userId);
  }
  getUserReservations(userEmail:any,brachId:number){
    console.log('adding rating  ...');
    return this._http.get<any>(this.userReservationsUrl + '?email=' + userEmail + '&branchId=' + brachId);
  }

  cancelReservation(resId:number){
    return this._http.get<any>(this.cancelReservationUrl + '?resId=' + resId);
  }
}

  


