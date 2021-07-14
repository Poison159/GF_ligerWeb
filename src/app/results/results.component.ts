import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestaurantsService } from 'src/services/restaurants.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  branches =  new Array<any>();
  constructor(private route:ActivatedRoute,private resturantServ:RestaurantsService, 
    private router: Router,private spinner: NgxSpinnerService) { 
      this.route.queryParams.subscribe(params => {
        if (params && params.branches) {
          this.branches = JSON.parse(params.branches);
        }
      });

    }

  ngOnInit(): void {
    this.spinner.show(); 
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
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
