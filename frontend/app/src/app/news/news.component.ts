import { Component, OnInit } from '@angular/core';
import { News } from '../model/news.model';
import { FilesService } from '../services/files.service';

/**
 * @module
 * komponenta za prikaz glavnih obavestenja kojima upravlja admin
 */
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
    let tmp = localStorage.getItem("type");
    if(!tmp){
      this.type = -1;
    }
    else{
      this.type = JSON.parse(localStorage.getItem("type"));
    }
    //filtriranje obavestenja mladjih od 3 meseca i sortiranje po datumu
    this.filesService.getAllNews().subscribe((news: News[])=>{
      this.allNews = news.filter((n)=>{
        let date3 = new Date(n.date);
        date3.setMonth(date3.getMonth() + 3);
        return (date3 >= new Date());
      })
      this.allNews = this.allNews.sort((a, b)=>{
       if(a.idN < b.idN) {
         return 1;
       }
       else return -1;
      })
    })
    this.filesService.getAllCategories().subscribe((categories: Object[])=>{
      this.allCategories = [];
      console.log(categories);
      categories.forEach(c =>{
        this.allCategories.push(c["category"]);
      });
    })
  }

  type: number;

  allCategories: string[];
  allNews: News[];
  newsInsert: News = new News();
  messageInsert: string = "";

  /**
   * dodavanje obavestenja
   */
  insertNews() {
      if(!this.newsInsert.title){
        this.messageInsert = "Potrebno je uneti naslov vesti!"
        return;
      }
      if(!this.newsInsert.text){
        this.messageInsert = "Potrebno je uneti tekst vesti!"
        return;
      }
      if(!this.newsInsert.category){
        this.messageInsert = "Potrebno je odabrati kategoriju vesti!"
        return;
      }
      
      let n = {
        title: this.newsInsert.title,
        text: this.newsInsert.text,
        category: this.newsInsert.category,
        date: (new Date()).toLocaleDateString()
      }
      this.filesService.insertNews(n).subscribe((res)=>{
        if(res["message"] == 1){
          location.reload();
        }
      })
  }

  categoryInsert: string;
  messageCategoryInsert: string;

  /**
   * dodavanje kategorije obavestenja
   */
  insertCategory(){
    if(!this.categoryInsert){
      this.messageCategoryInsert = "Polje naziv kategorije ne sme biti prazno!";
      return;
    }
    this.filesService.insertCategory(this.categoryInsert).subscribe((res)=>{
      if(res["message"] == 2){
        this.messageCategoryInsert = "Kategorija postoji!";
      }
      else if(res["message"] == 1){
        location.reload();
      }
    })
  }

  categorySelected: string;
  categoryUpdate: string;
  messageCategoryUpdate: string;

  /**
   * azuriranje kategorije obavestenja
   */
  updateCategory(){
    if(!this.categorySelected){
      this.messageCategoryUpdate = "Potrebno je odabrati kategoriju za izmenu!";
      return;
    }
    if(!this.categoryUpdate){
      this.messageCategoryUpdate = "Polje naziv kategorije ne sme biti prazno!";
      return;
    }
    this.filesService.udpateCategory(this.categorySelected, this.categoryUpdate).subscribe((res)=>{
      if(res["message"] == 2){
        this.messageCategoryUpdate = "Kategorija postoji!";
      }
      else if(res["message"] == 1){
        location.reload();
      }
    })
  }

}
