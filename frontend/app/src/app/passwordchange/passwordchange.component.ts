import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

/**
 * @module
 * komponenta za promenu lozinke
 */
@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    let passwordChanged: boolean = JSON.parse(localStorage.getItem("passwordChanged"));
    this.changeFailed = passwordChanged ? "" : "Promena lozinke je obavezna prilikom prvog logovanja u sistem!";
  }

  hide1: boolean = true;
  hide2: boolean = true;
  oldPassword: string;
  newPassword: string;
  changeFailed: string;

  /**
   * promena lozinke
   */
  changePassword(){
    if(!this.newPassword || !this.oldPassword){
      this.changeFailed = "Oba polja su obavezna!";
      return;
    }
    if(this.newPassword == this.oldPassword){
      this.changeFailed = "Nova lozinka se mora razlikovati od stare!";
      return;
    }
    this.loginService.changePassword(this.oldPassword, this.newPassword).subscribe((res: String)=>{
      if(res == "success"){
        localStorage.setItem("passwordChanged", JSON.stringify(true));
        this.router.navigate(['/']).then(succ => {
          location.reload();
        });
      }
      else{
        this.changeFailed = "Promena lozinke nije uspela! Unesite ispravnu staru lozinku!";
      }
    })
  }

}
