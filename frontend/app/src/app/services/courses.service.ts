import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInfo } from '../model/courseinfo.model';
import { Teaching } from '../model/teaching.model';

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

  getAllCourses(){
    
    return this.http.get(`${this.uri}/getAllCourses`);
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

  getCourseInfoByCode(code: String){
    let data = {
      code: code
    }

    return this.http.post(`${this.uri}/getCourseInfoByCode`, data);
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

  updateCourseInfo(courseInfo: CourseInfo){
    delete courseInfo["_id"];
    return this.http.post(`${this.uri}/updateCourseInfo`, courseInfo);
  }

  deleteCourseInfo(code: String, coursename: String){
    let data = {
      code: code,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/deleteCourseInfo`, data);
  }

  insertCourseInfo(courseInfo: CourseInfo){
    return this.http.post(`${this.uri}/insertCourseInfo`, courseInfo);
  }

  insertTeaching(teaching: Teaching){
    return this.http.post(`${this.uri}/insertTeaching`, teaching);
  }

}
