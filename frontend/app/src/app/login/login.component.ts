import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem("username") != null){
      this.loggedIn = true;
    }
  }

  username: string;
  password: string;
  loginSuccess: boolean = true;
  loggedIn: boolean = false;

  login(){
    this.loginService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        localStorage.setItem("username", user.username);
        localStorage.setItem("type", JSON.stringify(user.type));
        this.loginSuccess = true;
        this.loggedIn = true;
      }
      else{
        this.loginSuccess = false;
      }
    })
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    this.loggedIn = false;
  }

}
