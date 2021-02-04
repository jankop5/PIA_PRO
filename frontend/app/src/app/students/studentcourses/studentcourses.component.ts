import { Component, Input, OnInit } from '@angular/core';
import { Attending } from 'src/app/model/attending.model';
import { Course } from 'src/app/model/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-studentcourses',
  templateUrl: './studentcourses.component.html',
  styleUrls: ['./studentcourses.component.css']
})
export class StudentcoursesComponent implements OnInit {

  constructor(private studentsService: StudentsService, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.studentsService.getAttendingCourses(this.studentUsername).subscribe((teachingCourses: Attending[])=>{
      let flags = [], coursenames = [], n = teachingCourses.length;
      for(let i = 0 ; i < n; i++) {
        if( flags[teachingCourses[i].coursename]) continue;
        flags[teachingCourses[i].coursename] = true;
        coursenames.push(teachingCourses[i].coursename);
      }
      
      this.courses = [];
      coursenames.forEach(coursename => {
        this.coursesService.getCourse(coursename).subscribe((course: Course)=>{
          this.courses.push(coursename);
        })
      });
    });
  }

  @Input() studentUsername: string;
  courses: string[];

}
