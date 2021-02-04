import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student.model';
import { FilesService } from 'src/app/services/files.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

/**
 * @module
 * komponenta za prikaz profila studenta
 */
@Component({
  selector: 'app-studentpage',
  templateUrl: './studentpage.component.html',
  styleUrls: ['./studentpage.component.css']
})
export class StudentpageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentsService: StudentsService,
    private filesService: FilesService, private usersService: UsersService) { }

  student: Student;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let username = params['username'];
      this.studentsService.getStudent(username).subscribe((student: Student)=>{
        this.student = student;
      })
   });
  }

  message: string = "";
  /**
   * azuriranje podataka o studentu
   */
  update(){
    if(!this.student.firstName){
      this.message = "Polje ime je obavezno!";
      return;
    }
    if(!this.student.lastName){
      this.message = "Polje prezime je obavezno!";
      return;
    }
    if(!this.student.status){
      this.message = "Polje status je obavezno!";
      return;
    }
    this.usersService.updateUser(this.student).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }
}
