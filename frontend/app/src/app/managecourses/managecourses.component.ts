import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../course/course.component';
import { Attending } from '../model/attending.model';
import { Course } from '../model/course.model';
import { CourseInfo } from '../model/courseinfo.model';
import { Employee } from '../model/employee.model';
import { Student } from '../model/student.model';
import { Teaching } from '../model/teaching.model';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employees.service';
import { StudentsService } from '../services/students.service';

/**
 * @module
 * komponenta za upravljanje predmetima od strane admina
 */
@Component({
  selector: 'app-managecourses',
  templateUrl: './managecourses.component.html',
  styleUrls: ['./managecourses.component.css']
})
export class ManagecoursesComponent implements OnInit {

  constructor(private coursesService: CoursesService, private employeesService: EmployeesService,
    private studentsService: StudentsService) {
    }

  ngOnInit(): void {
    this.username  = localStorage.getItem("username");
    this.dataSources = [];
    this.dataSources.push([
      {name: "Naziv predmeta", value: ""}, {name: "Sifra predmeta", value: ""}, {name: "Modul", value: ""},
      {name: "Tip", value: ""}, {name: "Semsetar", value: ""},
      {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, 
      {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
      {name: "Termini nastave", value: ""}, {name: "Propozicije", value: ""}]
    );
    this.dataSources.push([
      {name: "Tip", value: ""}, {name: "Semsetar", value: ""},
      {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, 
      {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
      {name: "Termini nastave", value: ""}, {name: "Propozicije", value: ""}]
    );
    this.getAllCourses();
    this.getAllTeachers();
    this.getAllStudents();
  }
  
  username: string;
  type: number;
  courseInfo: CourseInfo;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[][];
  message: string = "";

  /**
   * dohvatanje svih predmeta
   */
  private getAllCourses(){
    this.courseInfos = [];
    this.coursesService.getAllCourses().subscribe((courses: Course[])=>{
      this.allCourses = courses;
      courses.forEach(course => {
        this.coursesService.getCourseInfosByCoursename(course.coursename).subscribe((cis: CourseInfo[])=>{
          cis.forEach(ci => {
            this.courseInfos.push(ci);
          })
        })
      });
    });
  }

  /**
   * dohvatanje svih nastavnika
   */
  private getAllTeachers(){
    this.employeesService.getAllEmployees().subscribe((employees: Employee[])=>{
      this.allTeachers = employees.filter(e =>{
        return e.title.substr(0, 6) != "ostali";
      })
    })
  }

  /**
   * dohvatanje svih studenata
   */
  private getAllStudents(){
    this.studentsService.getAllStudents().subscribe((students: Student[])=>{
      this.allStudents = students;
    })
  }

  /**
   * azuriranje informacija o predmetu
   */
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

  /**
   * brisanje predmeta
   */
  deleteCourseInfo(){
    this.coursesService.deleteCourseInfo(this.courseInfo.code, this.courseInfo.coursename).subscribe((res)=>{
      if(res["message"]==0){
        location.reload();
      }
      else if(res["message"]==1){
        location.reload();
      }
    })
  }

  newCourseInfo: CourseInfo = new CourseInfo();
  newMessage: string = "";

  /**
   * dodavanje novog predmeta
   */
  insertCourseInfo(){
    if(!this.newCourseInfo.coursename){
      this.newMessage = "Polje naziv predmeta je obavezno!";
      return;
    }
    if(!this.newCourseInfo.code){
      this.newMessage = "Polje šifra predmeta je obavezno!";
      return;
    }
    if(!this.newCourseInfo.module){
      this.newMessage = "Polje modul je obavezno!";
      return;
    }
    if(!this.newCourseInfo.semester){
      this.newMessage = "Polje semestar je obavezno!";
      return;
    }
    if(!this.newCourseInfo.espb){
      this.newMessage = "Polje espb je obavezno!";
      return;
    }
    this.coursesService.insertCourseInfo(this.newCourseInfo).subscribe((res)=>{
      if(res["message"] == 1){
        location.reload();
      }
    })
  }

  allTeachers: Employee[];
  allCourses: Course[];
  teaching: Teaching = new Teaching();
  messageTeaching: string;

  /**
   * plan angazovanja - dodavanje nastavnika na predmet
   */
  insertTeaching(){
    if(!this.teaching.coursename){
      this.messageTeaching = "Polje predmet je obavezno!";
      return;
    }
    if(!this.teaching.username){
      this.messageTeaching = "Polje nastavnik je obavezno!";
      return;
    }
    if(!this.teaching.group){
      this.messageTeaching = "Polje grupa je obavezno!";
      return;
    }
    this.coursesService.insertTeaching(this.teaching).subscribe((res)=>{
      if(res["message"]==2){
        this.messageTeaching = "Postoji dodeljen nastavnik za ovu grupu!";
      }
      else if(res["message"]==1){
        location.reload();
      }
    })
  }

  allStudents: Student[];
  attending: Attending = new Attending();
  messageAttending: string;

  /**
   * slusanje predmeta - dodavanje studenta na predmet
   */
  insertAttending(){
    if(!this.attending.coursename){
      this.messageAttending = "Polje predmet je obavezno!";
      return;
    }
    if(!this.attending.username){
      this.messageAttending = "Polje student je obavezno!";
      return;
    }
    this.studentsService.insertAttending(this.attending).subscribe((res)=>{
      if(res["message"]==2){
        this.messageAttending = "Student je već dodat na odabrani predmet!";
      }
      else if(res["message"]==1){
        location.reload();
      }
    })
  }

}
