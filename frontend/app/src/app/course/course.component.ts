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
import { saveAs } from 'file-saver';
import { FileInfo } from '../model/fileinfo.model';
import { Notice } from '../model/notice.model';

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
      this.username  = localStorage.getItem("username");
      this.type = JSON.parse(localStorage.getItem("type"));
      if(this.type == 1){
        this.employeesService.isTeachingCourse(this.username, coursename).subscribe((t: Teaching)=>{
          if(!t){
            this.router.navigate(['/']);
          }
        });
      }
      else if(this.type == 2){
        this.studentsService.isAttendingCourse(this.username, coursename).subscribe((a: Attending)=>{
          if(!a){
            this.router.navigate(['/']);
          }
        });
      }
      this.employeesService.getEmployee(this.username).subscribe((e: Employee)=>{
        this.employee = e;
      });
      this.loadCourse(coursename);
      
   });
  }
  
  username: string;
  type: number;
  employee: Employee;
  course: Course;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[][] = [];
  teachers: Employee[][] = [];
  courseInfoNotices: Notice[][] = [];

  private loadCourse(coursename: string){
    this.coursesService.getCourse(coursename).subscribe((course: Course)=>{
      this.course = course;
      this.coursesService.getCourseInfosByCoursename(coursename).subscribe((courseInfos: CourseInfo[])=>{
        this.courseInfos = courseInfos;
        for(let i = 0; i < courseInfos.length; i++){
          this.dataSources.push([
            {name: "Tip", value: ""}, {name: "Godina studija", value: ""}, {name: "Semsetar", value: ""}, {name: "Šifra predmeta", value: ""},
            {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
            {name: "Termini nastave", value: ""}, {name: "Grupe", value: ""}, {name: "Propozicije", value: ""}
          ]);
          this.teachers.push([]);
          this.courseInfoNotices.push([]);
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

          this.filesService.getNoticesForCode(ci.code).subscribe((notices: Notice[])=>{
            notices = notices.filter(n => {
              return (new Date()).getTime() > (new Date(n.date)).getTime(); 
            })
            this.courseInfoNotices[i] = notices.sort((a, b)=>{
              return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
            })
          })
        };
        
      });
      this.getAllFiles();
    })
  }

  
  defaultFileName: string = "";
  fileInfoNames: string[];

  fileChangeEvent(fileInput: any, i: number) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileInfoNames[i] = fileInput.target.files[0].name;
    } 
  }

  sendFilesToServer(i: number) {
    // ako nije stranica sa obavestenjima onda se radi upload samo poslednjeg fajla
    while(this.uploaders[i].queue.length > 1 ){
      this.uploaders[i].queue.shift();
      
    }
    
    /*let fi = {
      originalName: myFile.name,
      coursename: this.course.coursename,
      type: this.uploaders[i].queue[0].file.name.split('.').pop(),
      size: Math.round((this.uploaders[i].queue[0].file.size / 1024)),
      kind: this.fileKinds[i],
      date: (new Date()).toLocaleDateString(),
      username: this.username,
      order: 0
    }*/
    this.uploaders[i].onBuildItemForm = (item, form) => {
      form.append("coursename", this.course.coursename);
      form.append("type", this.uploaders[i].queue[0].file.name.split('.').pop());
      form.append("size", Math.round((this.uploaders[i].queue[0].file.size / 1024)));
      form.append("kind", this.fileKinds[i]);
      form.append("date", (new Date()).toLocaleDateString());
      form.append("teacher", this.employee.firstName + " " + this.employee.lastName);
    };
    this.uploaders[i].onCompleteAll = ()=>{
      this.getAllFiles();
    }
    this.uploaders[i].uploadAll();
    this.fileInfoNames[i] = this.defaultFileName;
    
  }

  clearLoader(i: number){
    this.uploaders[i].clearQueue();
    this.fileInfoNames[i] = this.defaultFileName;
  }

  allFiles: FileInfo[][];
  fileKinds: string[] = ["predavanja", "vežbe", "rokovi", "lab", "projekat"];

  private getAllFiles(){
    this.allFiles = [];
    this.filesService.getAllFiles(this.course.coursename).subscribe((files: FileInfo[])=>{
      let f = files.sort((a, b) => {
        return a.order - b.order;
      });
      for (let i = 0; i < this.fileKinds.length; i++) {
        this.allFiles.push(f.filter(file => {
          return file.kind == this.fileKinds[i];
        }));      
      }
    })
  }

  download(uploadName: string){
    this.filesService.download(uploadName).subscribe((data)=>{
      saveAs(data, uploadName);
    })
  }

  delete(uploadName: string){
    this.filesService.deleteFilesInfo(uploadName).subscribe((res)=>{
      if(res["message"]==1){
        this.getAllFiles();
      } 
    })
  }

  updateOrder(ix: number){
    let uploadNames: string[] = [];
    let orders: number[] = [];
    for (let i = 0; i < this.allFiles[ix].length; i++) {
      if(this.allFiles[ix][i].order == null){
        return;
      }
      uploadNames.push(this.allFiles[ix][i].uploadName);
      orders.push(this.allFiles[ix][i].order);
    }

    this.filesService.updateFilesInfoOrder(uploadNames, orders).subscribe((res)=>{
      if(res["message"] == 1){
        this.getAllFiles();
      }
    });

  }

  uploaders: FileUploader[];


  private initUploaders(){
    let URLSingle = 'http://localhost:4000/upload';
    this.uploaders = [];
    this.fileInfoNames = [];
    for (let i = 0; i < this.fileKinds.length; i++) {
      this.fileInfoNames.push(this.defaultFileName);
      this.uploaders.push(new FileUploader({url: URLSingle, itemAlias: 'fileInfo'}));
      this.uploaders[i].onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploaders[i].onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("Upload:uploaded:", item, status, response);
    };
    }
  }

  updateCourseShow(){
    this.coursesService.updateCourseShow(this.course.coursename, this.course.showExams, this.course.showLabs, this.course.showProject,
      this.course.labInfo, this.course.projectInfo).subscribe((res)=>{
      if(res["message"] == 1){}
    });
  }

  isFreshNotice(dateString: string){
    let date7 = new Date();
    date7.setDate(date7.getDate() - 7);
    return (new Date(dateString) >= date7);
  }
}
