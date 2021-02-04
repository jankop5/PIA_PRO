import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  isAttendingCourse(username: string, coursename: string){
    let data = {
      username: username,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/isAttending`, data);
  }

  getAllStudents(){
    return this.http.get(`${this.uri}/getAllStudents`);
  }

  getAttendingCourses(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/attendingCoursesByUsername`, data);
  }

  getStudent(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }
}
