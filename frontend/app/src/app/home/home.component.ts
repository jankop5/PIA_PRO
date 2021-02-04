import { Component, OnInit } from '@angular/core';

/**
 * @module
 * komponenta za prikaz pocetne stranice katedre
 */
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

  /**
   * slajdovanje slika
   */
  selectNextTab(){
    this.selectedIndex++;
    if(this.selectedIndex == this.maxIndex){
      this.selectedIndex = 0;
    }
  }

}
