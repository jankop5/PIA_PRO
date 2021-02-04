import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInfo } from '../model/courseinfo.model';
import { Teaching } from '../model/teaching.model';

/**
 * @module
 * servis za predmete
 */
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * dohvatanje predmeta
   * @param coursename ime predmeta
   */
  getCourse(coursename: string){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/findByCoursename`, data);
  }

  /**
   * dohvatanje svih predmeta
   */
  getAllCourses(){
    
    return this.http.get(`${this.uri}/getAllCourses`);
  }

  /**
   * dohvatanje svih predmeta za odredjeni modul
   * @param module modul
   */
  getCoursesByModule(module: string){
    let data = {
      module: module
    }

    return this.http.post(`${this.uri}/allCoursesByModule`, data);
  }

  /**
   * dohvatanje informacija o predmetu
   * @param coursename ime kursa
   */
  getCourseInfosByCoursename(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/courseInfosByCoursename`, data);
  }

  /**
   * dohvatanje informacija o predmetu
   * @param code sifra predmeta
   */
  getCourseInfoByCode(code: String){
    let data = {
      code: code
    }

    return this.http.post(`${this.uri}/getCourseInfoByCode`, data);
  }

  /**
   * dohvatanje nastavnika koji su na predmetu
   * @param coursename ime predmeta
   */
  getTeachers(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/teachersByCoursename`, data);
  }

  /**
   * dohvatanje plana angazovanja za predmet
   * @param coursename predmet
   */
  getTeachingByCoursename(coursename: String){
    let data = {
      coursename: coursename
    }

    return this.http.post(`${this.uri}/teachingCoursesByCoursename`, data);
  }

  /**
   * azuriranje informacija o predmetu
   * @code
   * primer kako ne treba da se primaju svi podaci kao parametri nego je trebalo kroz objekat
   */
  updateCourseShow(coursename: string, showExams: boolean, showLabs: boolean, showProjects: boolean, labInfo: string, projectInfo: string){
    let data = {
      coursename: coursename,
      showExams: showExams,
      showLabs: showLabs,
      showProjects: showProjects,
      labInfo: labInfo,
      projectInfo: projectInfo
    }

    return this.http.post(`${this.uri}/updateCourseShow`, data);
  }

  /**
   * azuriranje informacija o predmetu
   * @param courseInfo informacije o predmetu
   */
  updateCourseInfo(courseInfo: CourseInfo){
    delete courseInfo["_id"];
    return this.http.post(`${this.uri}/updateCourseInfo`, courseInfo);
  }

  /**
   * brisanje predmeta i informacija
   * @param code sifra predmeta
   * @param coursename ime predmeta
   */
  deleteCourseInfo(code: String, coursename: String){
    let data = {
      code: code,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/deleteCourseInfo`, data);
  }

  /**
   * dodavanje novog predmeta i informacija
   * @param courseInfo informacije o predmetu
   */
  insertCourseInfo(courseInfo: CourseInfo){
    return this.http.post(`${this.uri}/insertCourseInfo`, courseInfo);
  }

  /**
   * dodavanje u plan angazovanja predmet, nastavnika i grupu
   * @param teaching predmet, nastavnik, grupa
   */
  insertTeaching(teaching: Teaching){
    return this.http.post(`${this.uri}/insertTeaching`, teaching);
  }

}
