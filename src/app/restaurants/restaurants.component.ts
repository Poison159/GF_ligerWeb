import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestaurantsService } from 'src/services/restaurants.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

   branches =  new Array<any>();
   categories : { [cat: string]: any[]; } = { };
   public user: any;
   public username = "";
   public temp : any;
   public logo = '../../assets/imgs/icon.png'

  constructor(private resturantServ:RestaurantsService, 
    private router: Router,private route:ActivatedRoute,private spinner: NgxSpinnerService) {

      this.route.queryParams.subscribe(params => {
        if (params && params.branches) {
          this.branches = JSON.parse(params.branches);
        }
        if (params && params.token) {
          this.temp = JSON.parse(params.token);
          this.user = this.temp._user;
          this.username = this.user.Name;
        }
      });
     }

  ngOnInit(): void {
    this.spinner.show();
    
    this.nearMe();
    if(!this.temp){
      let res =  JSON.parse(localStorage.getItem('lg-token') || '{}');
      if(!this.isEmpty(res)){
        this.user = res._user;
        this.username = this.user.Name;
      }
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3700);
    
  }

   isEmpty(obj:any) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  goToAll(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        branches: JSON.stringify(this.branches)
      }
    }
    this.router.navigate(['see-all'],navigationExtras);
  }

  getCategries(meals:any){
    if(Object.keys(this.categories).length !== 6){
      for (let key in meals) {
        let value = meals[key];
        if(!this.categories[key]){
          this.categories[key] = value;
        }else{
          value.forEach( (meal:any) => {
            this.categories[key].push(meal);
          });
        }
      }
    }
  }

  ucfirst(str :string) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
  }

  gotToOurMenu(category: KeyValue<string, any[]>){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        cat: JSON.stringify(category),
      }
    }
    this.router.navigate(['our-menu'],navigationExtras);
  }

  nearMe(){
    
    let allMeals = new Array<any>();
    navigator.geolocation.getCurrentPosition(resp => {
      this.resturantServ.getAllResturantsNearMe(String(resp.coords.latitude),String(resp.coords.longitude))
        .subscribe(res => {
          this.branches = res;
          this.branches.forEach(branch => {
            this.getCategries(branch.resturant.meals); 
          });   
        },(err:any) => {
          alert("could not get restaurants,check internet connection");
        },() => {
          
        });
     },(error) => {
       console.log('Error getting location', error);
     });
  }

  

  goToCategory(branchId:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        branch: JSON.stringify(this.branches.filter(x => x.id == branchId)[0]),
      }
    }
    this.router.navigate(['categories'],navigationExtras);
  }

}
