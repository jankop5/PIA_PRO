import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';

/**
 * @module
 * komponenta za prikaz profila zaposlenog
 */
@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private employeesService: EmployeesService,
    private filesService: FilesService, private usersService: UsersService, private router: Router) { }

  employee: Employee;
  currentUsername: string;
  currentType: number;

  ngOnInit(): void {
    this.currentUsername = localStorage.getItem("username");
    this.currentType = JSON.parse(localStorage.getItem("type"));
    this.route.params.subscribe(params => {
      let username = params['username'];
      this.employeesService.getEmployee(username).subscribe((employee: Employee)=>{
        this.employee = employee;
        if(!this.employee){ //redirekcija ako parametar nije pravi
          this.router.navigate([""]);
          return;
        }
        if(this.employee.imageName){
          this.filesService.download(this.employee.imageName).subscribe((data)=>{
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( data );
            var img: HTMLImageElement = document.querySelector( "#profilePhoto" );
            img.src = imageUrl;
          });
        }
      })
   });
  }

  /**
   * slanje azuriranih podataka serveru
   */
  updateEmployee(){
    this.usersService.updateUser(this.employee).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }

  message: string = "";
  /**
   * azuriranje podataka o zaposlenom
   */
  update(){
    if(!this.employee.firstName){
      this.message = "Polje ime je obavezno!";
      return;
    }
    if(!this.employee.lastName){
      this.message = "Polje prezime je obavezno!";
      return;
    }
    if(!this.employee.address){
      this.message = "Polje adresa je obavezno!";
      return;
    }
    if(!this.employee.title){
      this.message = "Polje zvanje je obavezno!";
      return;
    }
    if(!this.employee.cabinet){
      this.message = "Polje kabinet je obavezno!";
      return;
    }
    if(!this.employee.status){
      this.message = "Polje status je obavezno!";
      return;
    }
    this.updateEmployee();
  }

}
