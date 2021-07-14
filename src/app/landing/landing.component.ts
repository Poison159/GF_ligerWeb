import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  imgPath = '../assets/imgs/icon.png';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Register() {
    this.router.navigate(['register']);
  }

  login() {
    this.router.navigate(['login']);
  }

}
