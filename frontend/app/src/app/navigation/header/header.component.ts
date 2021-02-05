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
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  language: number;
  text: string[][];
}