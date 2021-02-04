import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * @module
 * komponenta za prikaz glavnog menija
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  type: number;

  ngOnInit() {
    this.type = JSON.parse(localStorage.getItem("type"));
  }

  /**
   * toglovanje prikaza bocnog menija
   */
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}