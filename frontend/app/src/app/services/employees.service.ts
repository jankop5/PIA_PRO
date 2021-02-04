import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @module
 * servis za zaposlene
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * dohvatanje svih zaposlenih
   */
  getAllEmployees(){
    return this.http.get(`${this.uri}/getAllEmployees`);
  }

  /**
   * dohvatanje zaposlenog
   * @param username korisnicko ime
   */
  getEmployee(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }

  /**
   * dohvatanje plana angazovanja za nastavnika
   * @param username korisnicko ime
   */
  getTeachingCourses(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/teachingCoursesByUsername`, data);
  }

  /**
   * provera da li je nastavnik na predmetu
   * @param username korisnicko ime nastavnika
   * @param coursename ime predmeta
   */
  isTeachingCourse(username: string, coursename: string){
    let data = {
      username: username,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/isTeaching`, data);
  }
  
}
