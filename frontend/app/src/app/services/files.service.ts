import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notice } from '../model/notice.model';

/**
 * @module
 * servis za fajlove
 */
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  /**
   * dohvatanje svih fajlova na sajtu predmeta
   * @param coursename ime predmeta
   */
  getAllFiles(coursename: string) {
    let data = {
      coursename: coursename
    }
    return this.http.post(`${this.uri}/getAllFilesInfoByCoursename`, data);
  }

  /**
   * download fajla
   * @param uploadName ime fajla na serveru
   */
  download(uploadName: string){
    let data = {
      fileName: uploadName
    }

    return this.http.post(`${this.uri}/download`, data, {
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  /**
   * brisanje fajla sa sajta predmeta
   * @param uploadName ime fajla na serveru
   */
  deleteFilesInfo(uploadName: string){
    let data = {
      uploadName: uploadName
    }

    return this.http.post(`${this.uri}/deleteFilesInfo`, data);
  }

  /**
   * azuriranje redosleda prikaza fajlova na sajtu predmeta
   * @param uploadNames imena fajlova na serveru
   * @param orders redosled
   */
  updateFilesInfoOrder(uploadNames: string[], orders: number[]){
    let data = {
      uploadNames: uploadNames,
      orders: orders
    }

    return this.http.post(`${this.uri}/updateFilesInfoOrder`, data);
  }

  /**
   * dohvatanje broja obavestenja o predmetu
   */
  getNumOfNotices(){
    return this.http.get(`${this.uri}/getNumOfNotices`);
  }

  /**
   * dodavanje obavestenja o predmetu
   * @param notice obavestenje
   */
  insertNotice(notice: Notice){
    return this.http.post(`${this.uri}/insertNotice`, notice);
  }

  /**
   * dohvatanje svih obavestenja za predmet
   * @param code sifra predmeta
   */
  getNoticesForCode(code: string){
    let data = {
      code: code
    }

    return this.http.post(`${this.uri}/getNoticesForCode`, data);
  }

  /**
   * brisanje obavsetenja o predmetu
   * @param idN id obavestenja
   */
  deleteNotice(idN: number){
    let data = {
      idN: idN
    }

    return this.http.post(`${this.uri}/deleteNotice`, data);
  }

  /**
   * dohvatanje svih kategorija opstih obavestenja
   */
  getAllCategories(){

    return this.http.get(`${this.uri}/getAllCategories`);
  }

  /**
   * dohvatanje svih opstih obavestenja
   */
  getAllNews(){

    return this.http.get(`${this.uri}/getAllNews`);
  }

  /**
   * dodavanje opsteg obavestenja
   * @param news obavsetenje
   */
  insertNews(news){
    return this.http.post(`${this.uri}/insertNews`, news);
  }

  /**
   * dodavanje kategorije opsteg obavestenja
   * @param category kategorija
   */
  insertCategory(category: string){
    let data = {
      category: category
    }

    return this.http.post(`${this.uri}/insertCategory`, data);
  }

  /**
   * azuriranje kategorije opsteg obavestenja
   * @param category staro ime kategorije
   * @param newCategory novo ime kategorije
   */
  udpateCategory(category: string, newCategory: string){
    let data = {
      category: category,
      newCategory: newCategory
    }

    return this.http.post(`${this.uri}/udpateCategory`, data);
  }

  /**
   * dodavanje spiska
   * @param list spisak
   */
  insertList(list){
    return this.http.post(`${this.uri}/insertList`, list);
  }

  /**
   * dohvatanje spiskova za predemet
   * @param coursename ime predmeta
   */
  getAllLists(coursename: string){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/getAllLists`, data);
  }

  /**
   * zatvaranje spiska
   * @param idL id spiska
   */
  closeList(idL: number){
    let data = {
      idL: idL
    }

    return this.http.post(`${this.uri}/closeList`, data);
  }

  /**
   * prijava studenta na spisak
   * @param idL id spiska
   * @param username korisnicko ime
   */
  applyOnList(idL: number, username: string){
    let data = {
      idL: idL,
      username: username
    }

    return this.http.post(`${this.uri}/applyOnList`, data);
  }
}
