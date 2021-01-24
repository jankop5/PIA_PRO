import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getCourse(coursename: string){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/findByCoursename`, data);
  }
}
