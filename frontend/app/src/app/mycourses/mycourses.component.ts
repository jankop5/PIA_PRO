import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FileUploader } from 'ng2-file-upload';
import { PeriodicElement } from '../course/course.component';
import { CourseInfo } from '../model/courseinfo.model';
import { Employee } from '../model/employee.model';
import { Notice } from '../model/notice.model';
import { Teaching } from '../model/teaching.model';
import { CoursesService } from '../services/courses.service';
import { EmployeesService } from '../services/employees.service';
import { FilesService } from '../services/files.service';


@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  constructor(private coursesService: CoursesService, private employeesService: EmployeesService,
    private filesService: FilesService) {
      this.initUploaders();
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear, 11, 31);
    }

  ngOnInit(): void {
    this.username  = localStorage.getItem("username");
    this.dataSources = [
      {name: "Tip", value: ""}, {name: "Semsetar", value: ""},
      {name: "Fond časova", value: ""}, {name: "ESPB", value: ""}, 
      {name: "Cilj", value: ""}, {name: "Ishod", value: ""},
      {name: "Termini nastave", value: ""}, {name: "Propozicije", value: ""}
    ];
    this.employeesService.getEmployee(this.username).subscribe((e: Employee)=>{
      this.employee = e;
    });
    this.getMyCourses();
  }
  
  username: string;
  type: number;
  employee: Employee;
  courseInfo: CourseInfo;
  courseInfos: CourseInfo[];
  displayedColumns: string[] = ['name', 'value'];
  dataSources: PeriodicElement[] = [];
  myCoursesNotices: Notice[];

  private getMyCourses(){
    this.courseInfos = [];
    this.selectedCourseInfos = [];
    this.myCoursesNotices = [];
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
            this.selectedCourseInfos.push(false);
            this.filesService.getNoticesForCode(ci.code).subscribe((notices: Notice[])=>{
              this.myCoursesNotices = this.myCoursesNotices.concat(notices);
              this.myCoursesNotices = this.myCoursesNotices.sort((a, b)=>{
                return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
              })
            })
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

  title: string = "";
  text: string = "";
  defaultFileName: string = "";
  fileInfoNames: string[] = ["", ""];
  selectedCourseInfos: boolean[];
  minDate: Date;
  maxDate: Date;
  date: Date;
  message: string = "Dodavanje više fajlova se postiže odabirom jednog po jednog!";
  uploaders: FileUploader[];

  fileChangeEvent(fileInput: any, ix: number) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileInfoNames[ix] = fileInput.target.files[0].name;
    } 
  }

  sendNoticeToServer() {
    console.log(this.myCoursesNotices);
    // radi se aploud svih fajlova
    this.filesService.getNumOfNotices().subscribe(res=>{
      let idN = res["num"] + 1;
      let codes = [];
      let flag = false;
      for(let i = 0; i < this.selectedCourseInfos.length; i++){
        if(this.selectedCourseInfos[i]){
          codes.push(this.courseInfos[i].code);
          flag = true;
        }
      }
      if(!this.title || !this.text){
        this.message = "Potrebno je uneti naslov i tekst vesti!"
        return;
      }
      if(!flag){
        this.message = "Potrebno je odabrati makar jedan predmet!";
        return;
      }
      if(!this.date){
        this.message = "Potrebno je odabrati datum objavljivanja!";
        return;
      }
      if(this.uploaders[0].queue.length > 0){
        this.uploaders[0].onBuildItemForm = (item, form) => {
          form.append("idN", idN);
          form.append("title", this.title);
          form.append("text", this.text);
          form.append("codes", codes);
          form.append("date", this.date.toLocaleDateString());
          form.append("teacher", this.username);
        };
        console.log(this.uploaders[0].queue);
        this.uploaders[0].onCompleteAll = ()=>{
          location.reload();
        }
        this.uploaders[0].uploadAll();
      }
      else{
        let n: Notice = {
          idN: idN,
          title: this.title,
          text: this.text,
          originalNames: [],
          uploadNames: [],
          codes: codes,
          date: this.date.toLocaleDateString(),
          teacher: this.username
        }
        this.filesService.insertNotice(n).subscribe((res)=>{
          if(res["message"]==1){
            location.reload();
          }
        })
      }
    })
    
    //this.fileInfoNames[i] = this.defaultFileName;
  }

  clearLoader(ix: number){
    this.uploaders[ix].clearQueue();
    this.fileInfoNames[ix] = this.defaultFileName;
  }

  private initUploaders(){
    let URLSingle = 'http://localhost:4000/uploadNotice';
    this.uploaders = [];
    for (let i = 0; i < 2; i++) {
      this.uploaders.push(new FileUploader({url: URLSingle, itemAlias: 'notice'}));
      this.uploaders[i].onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploaders[i].onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("Upload:uploaded:", item, status, response);
    };
    }
  }

  setDate(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    console.log(this.date.toLocaleDateString());
  }

  delete(idN: number){
    this.filesService.deleteNotice(idN).subscribe((res)=>{
      if(res["message"]==1){
        this.getMyCourses();
      }
    })
  }

  dateUpdate: Date;
  noticeForUpdate: Notice;

  selectForUpdate(ix: number){
    this.noticeForUpdate = this.myCoursesNotices[ix];
  }

  setDateForUpdate(event: MatDatepickerInputEvent<Date>) {
    this.dateUpdate = event.value;
  }

  updateNotice(){
    this.filesService.deleteNotice(this.noticeForUpdate.idN).subscribe((res)=>{
      if(res["message"]==1){
        if(!this.noticeForUpdate.title || !this.noticeForUpdate.text){
          this.message = "Potrebno je uneti naslov i tekst vesti!"
          return;
        }
        if(!this.dateUpdate){
          this.message = "Potrebno je odabrati datum objavljivanja!";
          return;
        }
        if(this.uploaders[0].queue.length > 0){
          this.uploaders[0].onBuildItemForm = (item, form) => {
            form.append("idN", this.noticeForUpdate.idN);
            form.append("title", this.noticeForUpdate.title);
            form.append("text", this.noticeForUpdate.text);
            form.append("codes", this.noticeForUpdate.codes);
            form.append("date", this.dateUpdate.toLocaleDateString());
            form.append("teacher", this.username);
          };
          console.log(this.uploaders[0].queue);
          this.uploaders[0].onCompleteAll = ()=>{
            location.reload();
          }
          this.uploaders[0].uploadAll();
        }
        else{
          let n: Notice = {
            idN: this.noticeForUpdate.idN,
            title: this.noticeForUpdate.title,
            text: this.noticeForUpdate.text,
            originalNames: [],
            uploadNames: [],
            codes: this.noticeForUpdate.codes,
            date: this.dateUpdate.toLocaleDateString(),
            teacher: this.username
          }
          this.filesService.insertNotice(n).subscribe((res)=>{
            if(res["message"]==1){
              location.reload();
            }
          })
        }
      }
    })
  }

}
