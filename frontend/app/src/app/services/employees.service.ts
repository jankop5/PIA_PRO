import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllEmployees(){
    return this.http.post(`${this.uri}/allEmployees`, {});
  }

  getEmployee(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }

  getTeachingCourses(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/teachingCoursesByUsername`, data);
  }

  isTeachingCourse(username: string, coursename: string){
    let data = {
      username: username,
      coursename: coursename
    }

    return this.http.post(`${this.uri}/isTeaching`, data);
  }

  updateEmployee(employee){
    delete employee["_id"];
    return this.http.post(`${this.uri}/updateUser`, employee);
  }
}
