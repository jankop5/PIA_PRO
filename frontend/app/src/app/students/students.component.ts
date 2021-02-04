import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { StudentsService } from '../services/students.service';
import { UsersService } from '../services/users.service';

/**
 * @module
 * komponenta za prikaz stranice o studentima koju vidi jedino admin
 */
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private studentsService: StudentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  allStudents: Student[];

  /**
   * dohvatanje svih studenata
   */
  private getAllStudents(){
    this.studentsService.getAllStudents().subscribe((students: Student[])=>{
      this.allStudents = students;
    })
  }

  /**
   * brisanje studenta
   * @param username korisnicko ime
   */
  deleteStudent(username: string){
    this.usersService.deleteUser(username).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }
}
