import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestaurantsService } from 'src/services/restaurants.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  branch:any;
  public already = new Array<any>();
  public alreadyRes = new Array<any>();
  public closeResult = '';
  public branchRes : any;
  public timeReserved = {hour: 12, minute: 0};
  public mobileNumber: any;
  public dateReserved : any;
  public quantity = 0;
  private temp : any;
  private comment = "";
  private user: any;
  public rating = 0;
  public resDate = new Date();
  public returnRes: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resturantServ: RestaurantsService,
    private modalService: NgbModal
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.branch) {
        this.branch = JSON.parse(params.branch);
        this.sortMeals(this.branch.resturant.meals, this.branch.resturant.id);
      }
      if(params && params.temp){
        this.temp = JSON.parse(params.temp);
        this.user = this.temp._user;
      } 
      
    });
  }

  ngOnInit(): void {
    if(!this.temp){
      let res = JSON.parse(localStorage.getItem("lg-token") || '{}');
      this.user = res._user;
      this.getUserRating(res._user.Id);
      this.getUserReservations(res._user.Email);
      
    }else{
      this.getUserRating(this.temp._user.Id);
      this.getUserReservations(this.temp._user.Email);
    }
  }

  sortMeals(mealsArr:any[], resId: number){
    for (let key in mealsArr) {
      let value = mealsArr[key];
      let i = 0;
      value.forEach((meal:any) => {
        if(meal.resturantId !== resId){
          delete mealsArr[key][i];
        }
        i++;
      });
    }
  }

  details(category:string){
    let meals = null;
    if(category == "Special"){
      meals = this.branch.branchMeals;
    }else{
      meals = this.branch.resturant.meals[category];
    }     
    const navigationExtras: NavigationExtras = {
      queryParams: {
        meals: JSON.stringify(meals),
        specials: JSON.stringify(this.branch.branchMeals),
        category: category,
        branch: JSON.stringify(this.branch)
      }
    }
    this.router.navigate(['details'],navigationExtras);
  }

  onRateChange(event:any,branchId:any){
    this.branch.rating = event;
  }
  changeRated(branchId:any){
    this.branch.open = true;
  }

  CheckToken(token: any) {
    if(token.Errors)
      return false;
    else
      return true
  }

  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  scan(id: number, myAddress: string){
    navigator.geolocation.getCurrentPosition((resp) => {
    window.location.href = 'http://maps.google.com/maps?saddr=' +
    resp.coords.latitude.toString() + ', ' + resp.coords.longitude.toString()
    + '&daddr=' + encodeURIComponent(myAddress);
     },(err:any) => {
      alert("could not get restaurants,check internet connection");
    });
  }

  // ------------------------------------------Reservations -----------------------------------------------------------

  addReservation(returnContent:any){
    const strDate = this.dateReserved.year.toString() + '-' + this.dateReserved.month.toString() + '-' + this.dateReserved.day.toString();
    const strTime = this.timeReserved.hour.toString() + ':' + this.timeReserved.minute.toString();
    this.resturantServ.sendReservation(this.user.Id,this.branch.id,this.mobileNumber,this.quantity,strDate, strTime)
    .subscribe( async res => {
      if(!res.error){
        this.returnRes = res;
        this.branchRes = res;
        this.resDate = new Date(res.dateReservedAt);
        this.modalService.open(returnContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }else{
        this.modalService.open(res.error, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    },async (error: any) => {
      alert('could not add reservation');
    },() => {});
  }

  isEmpty(obj:any) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  getUserReservations(userEmail:string){
    this.resturantServ.getUserReservations(userEmail,this.branch.id)
    .subscribe((res:any[]) => {
      if(res.length !== 0){
        this.alreadyRes = res;
        this.branchRes  = this.alreadyRes.filter(x => x.branchId === this.branch.id)[this.alreadyRes.length - 1];
        this.resDate = new Date(this.branchRes.dateReservedAt);
      }
      
    },(error: any) => {

    },() => {});
  }

  UserHasReservation(){
    let res = JSON.parse(localStorage.getItem("lg-token") || '{}');
    let result = false;
    if(!this.isEmpty(this.branchRes) && this.branchRes !== undefined && this.branchRes.status !== "Cancelled"){
        if(this.branchRes.email == res._user.Email && this.resDate > new Date()){
          result = true;
        }
    }
    return result;
  }

  submitReservation(content:any, cancelContent:any) {
    if(!this.UserHasReservation()){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.modalService.open(cancelContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  cancelReservation(canContent:any){
    this.resturantServ.cancelReservation(this.branchRes.id)
    .subscribe( async res => {
      if(this.CheckToken(res)){
        this.branchRes = res;
        this.modalService.open(canContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }else{
        alert(res.error);
        this.modalService.dismissAll();
      }
    },async (error: any) => {
      alert('could not add reservation');
    },() => {});
  }

  //----------------------------------------------------------------------------------------------------------------------------------

  
  
  
  // ------------------------------------------------ Rating ---------------------------------------------------------------
  async submitRating(){
    
    if(this.rating == 0 || !this.branch.openOrClosedInfo){alert('Please select rating and add comment before submiting');}
    else{
      this.resturantServ.addRating(this.branch.openOrClosedInfo,this.user.Id,this.rating, this.branch.id)
      .subscribe( async res => {
        if(this.CheckToken(res)){
          this.already.push(this.branch.id);
          localStorage.setItem('localRated',JSON.stringify(this.already));
          this.branch.reviews.unshift(res);
          this.branch.open = true;
        }
      },async (error: any) => {
        alert('could not add rating 😢');
      },() => {});
    }
  }
  
    async getUserRating(id:any){
      this.resturantServ.getUserRatings(id)
      .subscribe((res : Array<any>) => {
        this.already = res;
      },(error: any) => {

      },() => {});
    }

  // --------------------------------------------------------------------------------------------------------------

 


}
