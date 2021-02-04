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
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { StudentsList } from '../model/list.model';

export interface PeriodicElement {
  name: string;
  value: string;
}

/**
 * @module
 * komponenta za rad sa predmetom
 */
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
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear, 11, 31);
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

  /**
   * ucitavanje svih podataka o predmetu koji se koriste i prikazuju
   * @param coursename ime predmeta
   */
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
      this.getAllLists();
    })
  }

  
  defaultFileName: string = "";
  fileInfoNames: string[];

  /**
   * ispis imena odabranog fajla radi sto boljeg simuliranja input type file
   * @param fileInput html input
   * @param i indeks elementa za prikaz
   */
  fileChangeEvent(fileInput: any, i: number) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      if(i < this.fileKinds.length){
        this.fileInfoNames[i] = fileInput.target.files[0].name;
      }
      else{
        this.fileInfoNameZip = fileInput.target.files[0].name;
      }
    } 
  }

  sendFilesToServer(i: number) {
    // ako nije stranica sa obavestenjima onda se radi upload samo poslednjeg fajla
    while(this.uploaders[i].queue.length > 1 ){
      this.uploaders[i].queue.shift();
      
    }
    /**
     * @code
     * primer kako ne moze da se salje normalno objekat uz body kod uploadera
     * mora se koristiti form.append
     */
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

  /**
   * brisanje odabranih fajlova iz reda u uploaderu
   * @param i indeks koji iznacava na kojem odeljku stranice se vrsi azuriranje
   */
  clearLoader(i: number){
    this.uploaders[i].clearQueue();
    this.fileInfoNames[i] = this.defaultFileName;
  }

  allFiles: FileInfo[][];
  fileKinds: string[] = ["predavanja", "vežbe", "rokovi", "lab", "projekat"];

  /**
   * dohvatanje svih fajlova na svim odeljcima sajta uz sortiranje po redosledu prikaza
   */
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

  /**
   * download fajla
   * @param uploadName ime fajla na serveru
   */
  download(uploadName: string){
    this.filesService.download(uploadName).subscribe((data)=>{
      saveAs(data, uploadName);
    })
  }

  /**
   * brisanje fajla
   * @param uploadName ime fajla na serveru
   */
  delete(uploadName: string){
    this.filesService.deleteFilesInfo(uploadName).subscribe((res)=>{
      if(res["message"]==1){
        this.getAllFiles();
      } 
    })
  }

  /**
   * azuriranje redosleda prikaza fajlova
   * @param ix indeks koji iznacava na kojem odeljku stranice se vrsi azuriranje
   */
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

  /**
   * inicijalizacija fajl loadera koji se koriste pri uploadu fajlova
   */
  private initUploaders(){
    let URLSingle = 'http://localhost:4000/upload';
    let URLZip = 'http://localhost:4000/uploadZip';
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
    this.uploaderZip = new FileUploader({url: URLZip, itemAlias: 'fileZip', allowedMimeType: ['application/x-zip-compressed']});
    this.uploaderZip.onAfterAddingFile = (file)=> { file.withCredentials = false; this.uploadedTypeFailed = false; this.listInsertMessage = ""};
    this.uploaderZip.onWhenAddingFileFailed = (item) => {this.uploadedTypeFailed = true; this.listInsertMessage = "Fajl mora biti u zip formatu!"}
    this.uploaderZip.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("Upload:uploaded:", item, status, response);
    }
  }

  /**
   * azuriranje osnovnih prikaza o kursu
   * @notice
   * ne treba slati ovako sve parametre posebno nego kroz objekat
   * kod zastareo
   */
  updateCourseShow(){
    this.coursesService.updateCourseShow(this.course.coursename, this.course.showExams, this.course.showLabs, this.course.showProject,
      this.course.labInfo, this.course.projectInfo).subscribe((res)=>{
      if(res["message"] == 1){}
    });
  }

  /**
   * provera da li je prosledjeni datum u periodu 7 dana pre danasnjeg datuma
   * @param dateString datum u string formatu
   */
  isFreshNotice(dateString: string){
    let date7 = new Date();
    date7.setDate(date7.getDate() - 7);
    return (new Date(dateString) >= date7);
  }


  minDate: Date;
  maxDate: Date;
  listInsert: StudentsList = new StudentsList();
  listInsertMessage: string = "";

  /**
   * dodavanje novog spiska
   */
  insertList(){
    if(!this.listInsert.title){
      this.listInsertMessage = "Polje naziv je obavezno!";
      return;
    }
    if(!this.listInsert.date){
      this.listInsertMessage = "Polje datum održavanja je obavezno!";
      return;
    }
    if(!this.listInsert.place){
      this.listInsertMessage = "Polje mesto je obavezno!";
      return;
    }
    if(!this.listInsert.limit){
      this.listInsert.limit = 0;
    }
    this.listInsert.coursename = this.course.coursename;
    this.filesService.insertList(this.listInsert).subscribe((res)=>{
      if(res["message"] == 1){
        this.getAllLists();
      }
    })
  }

  /**
   * @param event odabran datum iz komponente kalendar
   */
  setDate(event: MatDatepickerInputEvent<Date>) {
    this.listInsert.date = event.value.toLocaleDateString();
  }

  allLists: StudentsList[];

  /**
   * dohvatanje svih spisaka za predmet
   */
  private getAllLists(){
    this.filesService.getAllLists(this.course.coursename).subscribe((lists: StudentsList[])=>{
      console.log(lists);
      this.allLists = lists;
    })
  }

  /**
   * zatvaranje spiska
   * @param idL id spiska
   */
  closeList(idL: number){
    this.filesService.closeList(idL).subscribe((res)=>{
      if(res["message"]==1){
        this.getAllLists();
      }
    })
  }

  /**
   * provera da li je trenutni datum pre zadatog datuma
   * @param date datum
   */
  checkOpened(date: Date){
    return (new Date()).getTime() < (new Date(date)).getTime(); 
  }

  fileInfoNameZip: string = this.defaultFileName;
  uploaderZip: FileUploader;
  uploadedTypeFailed: boolean = false;

  /**
   * aploudovanje zip fajla
   * @param idL id spiska
   */
  sendZipToServer(idL: number) {
    // radi se upload samo poslednjeg fajla
    while(this.uploaderZip.queue.length > 1 ){
      this.uploaderZip.queue.shift();
    }
    if(this.uploadedTypeFailed) return;
    this.uploaderZip.onBuildItemForm = (item, form) => {
      form.append("username", this.username);
      form.append("idL", idL);
    };
    this.uploaderZip.onCompleteAll = ()=>{
      this.uploadedTypeFailed = false;
      this.listInsertMessage = "Fajl je poslat!";
      this.fileInfoNameZip = this.defaultFileName;
    }
    this.uploaderZip.uploadAll();
    this.fileInfoNameZip = this.defaultFileName;
    
  }

  /**
   * provera da li je student na spisku
   * @param usernames niz korisnickih imena koji se nalaze na spisku
   */
  checkApplied(usernames: string[]): boolean{
    for (let i = 0; i < usernames.length; i++) {
      if(usernames[i] == this.username){
        return true;
      }
    }
    return false;
  }

  /**
   * prijavljivanje studenta(trenutnog korisnika) na spisak
   * @param idL id spiska
   */
  applyOnList(idL: number){
    this.filesService.applyOnList(idL, this.username).subscribe((res)=>{
      if(res["message"] == 1){
        this.getAllLists();
      }
    })
  }
}
