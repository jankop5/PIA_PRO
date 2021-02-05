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
      "Osnovna priča o katedri",
      "Katedra za računarsku tehniku i informatiku danas predstavlja najbrojniju i najmlađu katedru na Elektrotehničkom fakultetu u Beogradu. Katedra je matična za dva odseka na osnovnim akademskim studijama, a to su Odsek za računarsku tehniku i informatiku (na studijskom programu Elektrotehnika i računarstvo) i Odsek za softversko inženjerstvo (na istoimenom studijskom programu), na kojima nastavnici i saradnici izvode veći deo nastave. Na ta dva odseka angažovan je i veći broj nastavnika sa drugih katedri, koji drže predmete iz oblasti matematike, fizike, elektronike, telekomunikacija, automatike, opšte elektrotehnike, a angažovani su i nastavnici stranih jezika i opšte obrazovanih predmeta. Takođe, naši nastavnici i saradnici izvode nastavu i na stručnim predmetima iz oblasti računarske tehnike i informatike i softverskog inženjerstva i na drugim odsecima studijskog programa Elektrotehnika i računarstvo. Na master akademskim studijama katedra rukovodi Modulom za računarsku tehniku i informatiku i Modulom za softversko inženjerstvo. Na doktorskim akademskim studijama katedra ima dva modula - Računarska tehnika i informatika i Softversko inženjerstvo. Svi programi studija redovno se pred svaki ciklus akreditacije studijskih programa usklađuju sa preporukama strukovnih organizacija IEEE i ACM, kao i potrebama ICT kompanija koje uspešno posluju u zemlji i inostranstvu, a pre svega potrebama domaće privrede, softverske i hardverske industrije.",
      "U školskoj 2020/21. godini, šef katedre je prof. Jelica Protić, zamenik šefa katedre je prof. Igor Tartalja, a sekretar katedre je doc. Marko Mišić.",
      "Na osnovnim akademskim studijama šef Odseka za RTI je prof. Miroslav Bojović, a šef Odseka za SI je prof. Boško Nikolić. Za master akademske studije zaduženi su rukovodioci modula - prof. Dragan Bojić (Modul SI) i prof. Zaharije Radivojević (Modul RTI). Za doktorske akademske studije zaduženi su rukovodioci modula – prof. Jelica Protić (Modul SI) i prof. Igor Tartalja (Modul RTI)."
    ]);

    this.text.push([
      "Почетна",
      "Основна прича о катедри",
      "Катедра за рачунарску технику и информатику данас представља најбројнију и најмлађу катедру на Електротехничком факултету у Београду. Катедра је матична за два одсека на основним академским студијама, а то су Одсек за рачунарску технику и информатику (на студијском програму Електротехника и рачунарство) и Одсек за софтверско инжењерство (на истоименом студијском програму), на којима наставници и сарадници изводе већи део наставе. На та два одсека ангажован је и већи број наставника са других катедри, који држе предмете из области математике, физике, електронике, телекомуникација, аутоматике, опште електротехнике, а ангажовани су и наставници страних језика и опште образованих предмета. Такође, наши наставници и сарадници изводе наставу и на стручним предметима из области рачунарске технике и информатике и софтверског инжењерства и на другим одсецима студијског програма Електротехника и рачунарство. На мастер академским студијама катедра руководи Модулом за рачунарску технику и информатику и Модулом за софтверско инжењерство. На докторским академским студијама катедра има два модула - Рачунарска техника и информатика и Софтверско инжењерство. Сви програми студија редовно се пред сваки циклус акредитације студијских програма усклађују са препорукама струковних организација ИЕЕЕ и АЦМ, као и потребама ИЦТ компанија које успешно послују у земљи и иностранству, а пре свега потребама домаће привреде, софтверске и хардверске индустрије.",
      "У школској 2020/21. години, шеф катедре је проф. Јелица Протић, заменик шефа катедре је проф. Игор Тартаља, а секретар катедре је доц. Марко Мишић.",
      "На основним академским студијама шеф Одсека за РТИ је проф. Мирослав Бојовић, а шеф Одсека за СИ је проф. Бошко Николић. За мастер академске студије задужени су руководиоци модула - проф. Драган Бојић (Модул СИ) и проф. Захарије Радивојевић (Модул РТИ). За докторске академске студије задужени су руководиоци модула – проф. Јелица Протић (Модул СИ) и проф. Игор Тартаља (Модул РТИ)."
    ]);

    this.text.push([
      "Home",
      "Story of the department",
      "The Department of Computer Science and Information Technology represents the most numerous and youngest department of the School of Electrical Engineering in Belgrade. The department is home to two departments in bachelor studies - Computer Engineering and Information Theory (Study programme Electrical and Computer Engineering) and Software Engineering (on the study program of the same name), in which teachers and associates profess most of the teaching. Many teachers from other departments are also engaged in those two departments, who teach subjects in the field of mathematics, physics, electronics, telecommunications, automation, general electrical engineering, and teachers of foreign languages and general education subjects are also engaged. Also, our teachers and associates teach in professional subjects in the field of Computer Engineering and Information Theory and Software Engineering and in other departments of the study programme Electrical and Computer Engineering. In the master's academic studies, the department manages the Module for Computer Engineering and Information Theory and the Module for Software Engineering. At the doctoral academic studies, the department has two modules - Computer Engineering and Information Theory and Software Engineering. Before each cycle of accreditation of study programs, all study programs are regularly harmonized with the recommendations of professional organizations IEEE and ACM, as well as the needs of ICT companies that operate successfully in the country and abroad, and above all the needs of domestic economy, software and hardware industry.",
      "In the school year 2020/21, the Chief of the department is professor PhD Jelica Protić, Deputy of the Department is professor PhD Igor Tartalja, and the Secretary of the department is asst. professor PhD Marko Mišić.",
      "At the bachelor studies, the chief of the Department for Computer Engineering and Information Theory is professor PhD Miroslav Bojović, and the chief of the Department for Software Engineering is professor PhD Boško Nikolić. In charge for master studies are professor PhD Dragan Bojić (Module SE) i professor PhD Zaharije Radivojević (Module CEIT). In charge for doctoral studies are professor PhD Jelica Protić (Module SE) i professor PhD Igor Tartalja (Module CEIT)."
    ]);

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

  text: string[][];
  language: number;

}
