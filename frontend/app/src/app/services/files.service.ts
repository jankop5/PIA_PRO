import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notice } from '../model/notice.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  getAllFiles(coursename: string) {
    let data = {
      coursename: coursename
    }
    return this.http.post(`${this.uri}/getAllFilesInfoByCoursename`, data);
  }

  download(uploadName: string){
    let data = {
      fileName: uploadName
    }

    return this.http.post(`${this.uri}/download`, data, {
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  deleteFilesInfo(uploadName: string){
    let data = {
      uploadName: uploadName
    }

    return this.http.post(`${this.uri}/deleteFilesInfo`, data);
  }

  updateFilesInfoOrder(uploadNames: string[], orders: number[]){
    let data = {
      uploadNames: uploadNames,
      orders: orders
    }

    return this.http.post(`${this.uri}/updateFilesInfoOrder`, data);
  }

  getNumOfNotices(){
    return this.http.get(`${this.uri}/getNumOfNotices`);
  }

  insertNotice(notice: Notice){
    return this.http.post(`${this.uri}/insertNotice`, notice);
  }

  getNoticesForCode(code: string){
    let data = {
      code: code
    }

    return this.http.post(`${this.uri}/getNoticesForCode`, data);
  }

  deleteNotice(idN: number){
    let data = {
      idN: idN
    }
    return this.http.post(`${this.uri}/deleteNotice`, data);
  }

}
