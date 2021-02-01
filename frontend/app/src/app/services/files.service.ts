import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  getAllFiles() {
    return this.http.get(`${this.uri}/getAllFilesInfo`);
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

  updateFilesInfoOrder(uploadName: string, order: number){
    let data = {
      uploadName: uploadName,
      order: order
    }

    return this.http.post(`${this.uri}/updateFilesInfoOrder`, data);
  }
}
