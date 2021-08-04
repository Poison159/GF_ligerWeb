import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})
export class SeeAllComponent implements OnInit {
  public branches : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) 
    {
      this.route.queryParams.subscribe(params => {
        if (params && params.branches) {
          this.branches = JSON.parse(params.branches); 
        }
      });

    }

  ngOnInit(): void {
  }


  goToCategory(branchId:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        branch: JSON.stringify(this.branches.filter((x:any) => x.id == branchId)[0])
      }
    }
    this.router.navigate(['categories'],navigationExtras);
  }

}
