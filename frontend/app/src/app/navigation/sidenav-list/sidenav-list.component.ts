import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * @module
 * komponenta za prikaz bocnog menija
 */
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  type: number;

  ngOnInit() {
    this.type = JSON.parse(localStorage.getItem("type"));
  }

  /**
  * toglovanje prikaza bocnog menija
  */
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}