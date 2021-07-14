import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public meals: any;
  public category: any;
  private specials: any;
  private already = new Array<any>();
  private temp : any;
  public branch: any;
  private comment = "";
  private user: any;
  constructor(
    private route:ActivatedRoute,
    private decimalPipe: DecimalPipe,
    ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.meals) {
          this.meals = JSON.parse(params.meals);
          this.meals.forEach((meal:any) => {
            if(meal !== null)
              meal.price = this.decimalPipe.transform(meal.price, '1.2-2');
          });
          this.specials = JSON.parse(params.meals);
          this.branch = JSON.parse(params.branch);
          this.category = params.category;
      }
    });
  }

  ngOnInit(): void {
  }

}
