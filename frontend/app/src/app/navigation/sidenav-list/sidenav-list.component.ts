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
    let tmp = localStorage.getItem("language");
    if(!tmp){
      this.language = 0;
      localStorage.setItem("langauage", JSON.stringify(0));
    }
    else{
      this.language = JSON.parse(tmp);
    }

    this.text = [];
    this.text.push([
      "Početna",
      "Studenti", 
      "Zaposleni",
      "Obaveštenja",
      "Moji predmeti",
      "Predmeti",
      "Osnovne studije",
      "Odsek RTI",
      "Odsek SI",
      "Ostali odseci",
      "Master studije",
      "Projekti",
      "Nauka",
      "Istraživanja",
      "Projekti",
      "Kontakt"
    ]);

    this.text.push([
      "Почетна",
      "Студенти", 
      "Запослени",
      "Обавештења",
      "Моји предмети",
      "Предмети",
      "Основне студије",
      "Одсек РТИ",
      "Одсек СИ",
      "Остали одсеци",
      "Мастер студије",
      "Пројекти",
      "Наука",
      "Истраживања",
      "Пројекти",
      "Контакт"
    ]);

    this.text.push([
      "Home",
      "Students", 
      "Employees",
      "News",
      "My courses",
      "Courses",
      "Bachelor studies",
      "Department CEIT",
      "Department SE",
      "Other departments",
      "Master studies",
      "Projects",
      "Science",
      "Research",
      "Projects",
      "Contact"
    ]);
  }

  /**
  * toglovanje prikaza bocnog menija
  */
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  language: number;
  text: string[][];
}