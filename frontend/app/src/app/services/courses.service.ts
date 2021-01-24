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

  getCoursesByModule(module: string){
    let data = {
      module: module
    }

    return this.http.post(`${this.uri}/allCoursesByModule`, data);
  }

  getCourseInfosByCoursename(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/courseInfosByCoursename`, data);
  }

  getTeachers(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/teachersByCoursename`, data);
  }

  getTeachingByCoursename(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/teachingCoursesByCoursename`, data);
  }
}
