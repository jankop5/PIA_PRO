import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("username") != null){
      this.loggedIn = true;
      this.type = JSON.parse(localStorage.getItem("type"));
      this.username = localStorage.getItem("username");
    }
  }

  username: string;
  password: string;
  loginSuccess: boolean = true;
  loggedIn: boolean = false;
  type: number;
  currentUsername: string;

  login(){
    this.loginService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        localStorage.setItem("username", this.username);
        localStorage.setItem("type", JSON.stringify(user.type));
        localStorage.setItem("passwordChanged", JSON.stringify(user.passwordChanged));
        this.loginSuccess = true;
        this.loggedIn = true;
        if(!user.passwordChanged){
          this.router.navigate(['/passwordchange']);
        }
        else{
          location.reload();
        }
      }
      else{
        this.loginSuccess = false;
      }
    })
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("passwordChanged");
    this.loggedIn = false;
    this.router.navigate(['/']).then(succ => location.reload());
  }

}
