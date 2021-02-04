import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { Teaching } from 'src/app/model/teaching.model';
import { CoursesService } from 'src/app/services/courses.service';
import { EmployeesService } from 'src/app/services/employees.service';

/**
 * @module
 * komponenta za prikaz linkova ka svim predmetima na kojima je nastavnik
 */
@Component({
  selector: 'app-employeecourses',
  templateUrl: './employeecourses.component.html',
  styleUrls: ['./employeecourses.component.css']
})
export class EmployeecoursesComponent implements OnInit {

  constructor(private employeesService: EmployeesService, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.employeesService.getTeachingCourses(this.employeeUsername).subscribe((teachingCourses: Teaching[])=>{
      let flags = [], coursenames = [], n = teachingCourses.length;
      for(let i = 0 ; i < n; i++) {
        if( flags[teachingCourses[i].coursename]) continue;
        flags[teachingCourses[i].coursename] = true;
        coursenames.push(teachingCourses[i].coursename);
      }
      
      this.courses = [];
      coursenames.forEach(coursename => {
        this.coursesService.getCourse(coursename).subscribe((course: Course)=>{
          let c = [coursename, coursename + " - " + course.codes.toString()];
          this.courses.push(c);
        })
      });
    });
  }

  @Input() employeeUsername: string;
  courses: string[][];
}
