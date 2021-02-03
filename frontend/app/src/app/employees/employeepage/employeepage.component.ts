import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { FilesService } from 'src/app/services/files.service';
import { URL } from 'url';

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private employeesService: EmployeesService,
    private filesService: FilesService) { }

  employee: Employee;
  currentUsername: string;

  ngOnInit(): void {
    this.currentUsername = localStorage.getItem("username");
    this.route.params.subscribe(params => {
      let username = params['username'];
      this.employeesService.getEmployee(username).subscribe((employee: Employee)=>{
        this.employee = employee;
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

  updateEmployee(){
    this.employeesService.updateEmployee(this.employee).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }

}
