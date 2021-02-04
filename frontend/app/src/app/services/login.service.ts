import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @module
 * servis za prijavu
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * prijava na sistem
   * @param username korisnicko ime
   * @param password lozinka
   */
  login(username: string, password: string){
    let data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  /**
   * promena lozinke
   * @param oldPassword stara lozinka
   * @param newPassword nova lozinka
   */
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