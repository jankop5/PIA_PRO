import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrls: ['./employeeinfo.component.css']
})
export class EmployeeinfoComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.type = JSON.parse(localStorage.getItem("type"));
  }

  type: number;

  @Input() prefix: string = "";
  @Input() sufix: string = "";
  @Input() employees: Employee[];

  deleteEmployee(username: string){
    this.employeesService.deleteEmployee(username).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }

}
