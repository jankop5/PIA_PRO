import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attending } from '../model/attending.model';

/**
 * @module
 * servis za studente
 */
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * provera da li student pohadja predmet
   * @param username korisnicko ime studenta
   * @param coursename ime predmeta
   */
  isAttendingCourse(username: string, coursename: string){
    let data = {
      username: username,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/isAttending`, data);
  }

  /**
   * dohvatanje svih studenata
   */
  getAllStudents(){
    return this.http.get(`${this.uri}/getAllStudents`);
  }

  /**
   * dohvatanje predmeta koje pohadja student
   * @param username korisnicko ime
   */
  getAttendingCourses(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/attendingCoursesByUsername`, data);
  }

  /**
   * dohvatanje studenta 
   * @param username korisnciko ime
   */
  getStudent(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }

  /**
   * dodavanje studenta na predmet
   * @param attending student, predmet
   */
  insertAttending(attending: Attending){
    return this.http.post(`${this.uri}/insertAttending`, attending);
  }
}
