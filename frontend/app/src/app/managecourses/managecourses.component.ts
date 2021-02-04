import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../course/course.component';
import { Course } from '../model/course.model';
import { CourseInfo } from '../model/courseinfo.model';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-managecourses',
  templateUrl: './managecourses.component.html',
  styleUrls: ['./managecourses.component.css']
})
export class ManagecoursesComponent implements OnInit {

  constructor(private coursesService: CoursesService) {
    }

  ngOnInit(): void {
    this.username  = localStorage.getItem("username");
    this.dataSources = [
      {name: "Tip", value: ""}, {name: "Semsetar", value: ""},
      {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, 
      {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
      {name: "Termini nastave", value: ""}, {name: "Propozicije", value: ""}
    ];
    this.getAllCourses();
  }
  
  username: string;
  type: number;
  courseInfo: CourseInfo;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[] = [];
  message: string = "";

  private getAllCourses(){
    this.courseInfos = [];
    this.coursesService.getAllCourses().subscribe((courses: Course[])=>{
      let flags = [], coursenames = [], n = courses.length;
      for(let i = 0 ; i < n; i++) {
        if( flags[courses[i].coursename]) continue;
        flags[courses[i].coursename] = true;
        coursenames.push(courses[i].coursename);
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
      this.message = "Polja espb i semestar moraju sadržati brojeve!";
      return;
    }
    this.coursesService.updateCourseInfo(this.courseInfo).subscribe((res) => {
      if(res["message"]==1){

      }
    })
  }

  deleteCourseInfo(){
    this.coursesService.deleteCourseInfo(this.courseInfo.code, this.courseInfo.coursename).subscribe((res)=>{
      if(res["message"]==0){

      }
      else if(res["message"]==1){
        
      }
    })
  }
}
