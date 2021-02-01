import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}