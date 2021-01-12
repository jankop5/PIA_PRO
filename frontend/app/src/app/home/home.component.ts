import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  selectedIndex: number;
  maxIndex: number;

  ngOnInit(): void {
    this.selectedIndex = 0;
    this.maxIndex = 3;
    setInterval(() => {
      this.selectNextTab();
  }, 10000);
  }

  selectNextTab(){
    this.selectedIndex++;
    if(this.selectedIndex == this.maxIndex){
      this.selectedIndex = 0;
    }
  }

}
