import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodicElement } from '../course/course.component';
import { CourseInfo } from '../model/courseinfo.model';
import { Employee } from '../model/employee.model';
import { Teaching } from '../model/teaching.model';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  constructor(private coursesService: CoursesService, private employeesService: EmployeesService,
    private router: Router) {
    }

  ngOnInit(): void {
    this.username  = localStorage.getItem("username");
    this.dataSources = [
      {name: "Tip", value: ""}, {name: "Semsetar", value: ""},
      {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, 
      {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
      {name: "Termini nastave", value: ""}, {name: "Propozicije", value: ""}
    ];
    this.getMyCourses();
  }
  
  username: string;
  type: number;
  employee: Employee;
  courseInfo: CourseInfo;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[] = [];

  getMyCourses(){
    this.courseInfos = [];
    this.employeesService.getTeachingCourses(this.username).subscribe((teachingCourses: Teaching[])=>{
      let flags = [], coursenames = [], n = teachingCourses.length;
      for(let i = 0 ; i < n; i++) {
        if( flags[teachingCourses[i].coursename]) continue;
        flags[teachingCourses[i].coursename] = true;
        coursenames.push(teachingCourses[i].coursename);
      }
      
      coursenames.forEach(coursename => {
        this.coursesService.getCourseInfosByCoursename(coursename).subscribe((cis: CourseInfo[])=>{
          cis.forEach(ci => {
            this.courseInfos.push(ci);
          })
        })
      });
    });
  }

  updateCourseInfo(){
    if(!this.courseInfo.espb || !this.courseInfo.semester){
      return;
    }
    this.coursesService.updateCourseInfo(this.courseInfo).subscribe((res) => {
      if(res["message"]==1){

      }
    })
  }

}
