import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/course.model';
import { CourseInfo } from '../model/courseinfo.model';
import { Employee } from '../model/employee.model';
import { Teaching } from '../model/teaching.model';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employees.service';
import { StudentsService } from '../services/students.service';
import { Attending } from '../model/attending.model';

export interface PeriodicElement {
  name: string;
  value: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, 
    private employeesService: EmployeesService, private studentsService: StudentsService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSources = [];
    this.teachers = [];
    this.route.params.subscribe(params => {
      let coursename = params['coursename'];
      let username = localStorage.getItem("username");
      let type:number = JSON.parse(localStorage.getItem("type"));
      if(type == 1){
        this.employeesService.isTeachingCourse(username, coursename).subscribe((t: Teaching)=>{
          if(!t){
            this.router.navigate(['/']);
          }
        });
      }
      else if(type == 2){
        this.studentsService.isAttendingCourse(username, coursename).subscribe((a: Attending)=>{
          if(!a){
            this.router.navigate(['/']);
          }
        });
      }

      this.loadCourse(coursename);
   });
  }
  
  course: Course;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[][] = [];
  teachers: Employee[][] = [];

  private loadCourse(coursename: string){
    this.coursesService.getCourse(coursename).subscribe((course: Course)=>{
      this.course = course;
      this.coursesService.getCourseInfosByCoursename(coursename).subscribe((courseInfos: CourseInfo[])=>{
        this.courseInfos = courseInfos;
        console.log(this.courseInfos);

        
        for(let i = 0; i < courseInfos.length; i++){
          this.dataSources.push([
            {name: "Tip", value: ""}, {name: "Godina studija", value: ""}, {name: "Semseta", value: ""}, {name: "Šifra predmeta", value: ""},
            {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
            {name: "Termini nastave", value: ""}, {name: "Grupe", value: ""}, {name: "Propozicije", value: ""}
          ]);
          this.teachers.push([]);
        }

        for (let i = 0; i < courseInfos.length; i++) {
          let ci = courseInfos[i];
          this.dataSources[i][0].value = ci.type;
          this.dataSources[i][1].value = String(Math.floor((ci.semester + 1) / 2));
          this.dataSources[i][2].value = String(ci.semester);
          this.dataSources[i][3].value = ci.code;
          this.dataSources[i][4].value = ci.lessions;
          this.dataSources[i][5].value = String(ci.espb);
          this.dataSources[i][6].value = ci.goal;
          this.dataSources[i][7].value = ci.outcome;
          this.dataSources[i][8].value = ci.terms;

          this.coursesService.getTeachingByCoursename(coursename).subscribe((teaching: Teaching[])=>{
            console.log(teaching);
            var flags = [];
            teaching.forEach(t => {
              this.employeesService.getEmployee(t.username).subscribe((teacher: Employee)=>{
                this.dataSources[i][9].value += t.group + ": " + teacher.firstName + " " + teacher.lastName + " ";
                if(!flags[teacher.username]){
                  this.teachers[i].push(teacher);
                  flags[teacher.username] = true;
                }
              })
            });
          });
          
          this.dataSources[i][10].value = ci.propositions;
        };
        
      });
    })
  }

}
