import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor() { }

   howHidden = false;
   freqAskedHidden = false;
  ngOnInit() {
  }
  
  setHowTrue(){
    this.howHidden = !this.howHidden;
  }
  setFreqAskedTrue(){
    this.freqAskedHidden = !this.freqAskedHidden;
  }

}
