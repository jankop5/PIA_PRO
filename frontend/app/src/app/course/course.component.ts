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
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from '../services/files.service';
import { FileModel } from '../model/file.model';
import { saveAs } from 'file-saver';

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
    private router: Router, private filesService: FilesService) { 
      this.initUploaders();
    }

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
      this.getAllFiles();
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

  
  defaultFileName: string = "";
  myFileNames: string[];

  fileChangeEvent(fileInput: any, i: number) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.myFileNames[i] = fileInput.target.files[0].name;
    } 
  }

  sendFilesToServer(i: number) {
    // ako nije stranica sa obavestenjima onda se radi upload samo poslednjeg fajla
    // ako je stranica sa obavestenjima onda se radi upload svih fajlova
    if(i > 0){
      while(this.uploaders[i].queue.length > 1 ){
        this.uploaders[i].queue.shift();
      }
    }
    this.uploaders[i].uploadAll();
    this.myFileNames[i] = "Naziv fajla";
  }

  clearLoader(i: number){
    this.uploaders[i].clearQueue();
    this.myFileNames[i] = "Naziv fajla";
  }

  allFiles: FileModel[];

  private getAllFiles(){
    this.filesService.getAllFiles().subscribe((files: FileModel[])=>{
      this.allFiles = files;
      console.log(files);
    })
  }

  download(uploadName: string){
    this.filesService.download(uploadName).subscribe((data)=>{
      saveAs(data, uploadName);
    })
  }

  uploaders: FileUploader[];
  fileKinds: string[] = ["obavestenja", "predavanja", "vezbe"];

  private initUploaders(){
    let URLSingle = 'http://localhost:4000/upload';
    this.uploaders = [];
    this.myFileNames = [];
    for (let i = 0; i < 6; i++) {
      this.myFileNames.push(this.defaultFileName);
      this.uploaders.push(new FileUploader({url: URLSingle, itemAlias: 'myFile'}));
      this.uploaders[i].onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploaders[i].onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("Upload:uploaded:", item, status, response);
    };
    }
  }
}
