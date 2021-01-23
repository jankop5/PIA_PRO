import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrls: ['./employeeinfo.component.css']
})
export class EmployeeinfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() prefix: string = "";
  @Input() sufix: string = "";
  @Input() employees: Employee[];

}
