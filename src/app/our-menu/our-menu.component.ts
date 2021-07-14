import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-our-menu',
  templateUrl: './our-menu.component.html',
  styleUrls: ['./our-menu.component.css']
})
export class OurMenuComponent implements OnInit {
  categories : any;
  title ='';
  dict  :  {[key: string]: Array<any>} = {};
  constructor( private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.cat) {
        this.categories = JSON.parse(params.cat);
        this.title = this.categories.key;
        this.categories.value.forEach((meal: any) => {
          if(!this.dict[meal.restaurantName]){
            this.dict[meal.restaurantName] = new Array<any>();
          }
          this.dict[meal.restaurantName].push(meal);
        });
      }
    });

  }

  ngOnInit(): void {
  }

}
