import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username: string, password: string){
    let data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  changePassword(oldPassword: string, newPassword: string) {
    let username = localStorage.getItem("username");
    console.log(username);
    console.log(oldPassword);
    console.log(newPassword);
    let data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/changePassword`, data);
  }
}