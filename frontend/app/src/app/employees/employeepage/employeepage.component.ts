import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})
export class EmployeepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private employeesService: EmployeesService) { }

  employee: Employee;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let username = params['username'];
      this.employeesService.getEmployee(username).subscribe((employee: Employee)=>{
        this.employee = employee;
      })
   });
  }

}
