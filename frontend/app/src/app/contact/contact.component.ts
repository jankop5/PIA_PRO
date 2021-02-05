import { Component, OnInit } from '@angular/core';

/**
 * @module
 * komponenta za prikaz kontakt informacija katedre
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      "Kontakt", 
      "Kontakt podaci katedre",
      "Katedra za računarsku tehniku i informatiku",
      "Univerzitet u Beogradu - Elektrotehnički fakultet",
      "POB 35-54, 11120 Beograd, Srbija",
      "dr Nenad Korolija",
      "Kabinet P-26, Paviljon Rašović, Beograd"
    ]);

    this.text.push([
      "Почетна",
      "Контакт", 
      "Контакт подаци катедре",
      "Катедра за рачунарску технику и информатику",
      "Универзитет у Београду - Електротехнички факултет",
      "ПОБ 35-54, 11120 Београд, Србија",
      "др Ненад Королија",
      "Кабинет П-26, Павиљон Рашовић, Београд"
    ]);

    this.text.push([
      "Home",
      "Contact", 
      "Contact info of the department",
      "The Department of Computer Science and Information Technology",
      "University of Belgrade - School of Electrical Engineering",
      "POB 35-54, 11120 Belgrade, Serbia",
      "PhD Nenad Korolija",
      "Cabinet P-26, Paviljon Rašović, Belgrade"
    ]);
  }

  language: number;
  text: string[][];

}
