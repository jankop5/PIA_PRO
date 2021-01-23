import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe((allEmployees: Employee[])=>{
      allEmployees = allEmployees.sort((a, b) =>{
        if(a.firstName < b.firstName) return -1;
        else if(a.firstName > b.firstName) return 1;
        else if(a.lastName < b.lastName) return -1;
        else if(a.lastName > b.lastName) return 1;
        else return 0;
      });
      console.log(allEmployees);
      this.employeesFP = allEmployees.filter(function(employee){
        return employee.title == "redovan profesor";
      });

      this.employeesAP = allEmployees.filter(function(employee){
        return employee.title == "vanredni profesor";
      });

      this.employeesD = allEmployees.filter(function(employee){
        return employee.title == "docent";
      });

      this.employeesA = allEmployees.filter(function(employee){
        return employee.title == "asistent";
      });

      this.employeesTA = allEmployees.filter(function(employee){
        return employee.title == "saradnik u nastavi";
      });

      this.employeesO = allEmployees.filter(function(employee){
        return employee.title.substr(0, 6) == "ostali";
      });
    })
  }

  employeesFP: Employee[];
  employeesAP: Employee[];
  employeesD: Employee[];
  employeesA: Employee[];
  employeesTA: Employee[];
  employeesO: Employee[];
}
