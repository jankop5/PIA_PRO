import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrls: ['./employeeinfo.component.css']
})
export class EmployeeinfoComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.type = JSON.parse(localStorage.getItem("type"));
  }

  type: number;

  @Input() prefix: string = "";
  @Input() sufix: string = "";
  @Input() employees: Employee[];

  deleteEmployee(username: string){
    this.usersService.deleteUser(username).subscribe((res)=>{
      if(res["message"]==1){
        location.reload();
      }
    })
  }

}
