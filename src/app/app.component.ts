import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestaurantsService } from 'src/services/restaurants.service';

export const url = 'https://localhost:44376/';
export const conUrl = 'https://weboneapp.conveyor.cloud/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  imgPath = '../assets/imgs/icon.png';
  title = 'ligerWeb';
  restaurants : any;
  username='';
  private branches = new Array<any>();
  public searchStr: any;
  _opened: boolean = false;
  

  constructor(private resturantServ:RestaurantsService, 
    private router: Router, private elementRef: ElementRef) {

      
  }
  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem('lg-token') || '{}');
      if(!this.isEmpty(item)){
        this.username= item._user.Name;
        this.goToRestaurants();
      }else{
        this.router.navigate(['landing']);
      }
  }

  
 
  _toggleSidebar() {
    this._opened = !this._opened;
  }

  isEmpty(obj:any) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFFFFF';
  }

  goToRestaurants(){
    this.router.navigate(['restaurants']);
  }

  async search(){
    if(this.searchStr ==""){
      alert("Please type name in search field");
    }else{
     this.resturantServ.serach(this.searchStr)
     .subscribe(async (res) => {
       if(this.checkRes(res)){
         alert(res.Errors);
       }else{
         const navigationExtras: NavigationExtras = {
           queryParams: {
             branches: JSON.stringify(res),
           }
         }
         this.router.navigate(['results'],navigationExtras);
       }
     }, (err:any) => {
       console.log(err)
     },() => {});
    }
  }

  goHome(){
    this.router.navigate(['/']);
  }
  goToSupport(){
    this.router.navigate(['support']);
  }

 checkRes(res: any){
  if(res.Errors){
    return true;
  }else{
    return false;
  }
}

  
}
