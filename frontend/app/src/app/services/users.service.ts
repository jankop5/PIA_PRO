import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  updateUser(user){
    delete user["_id"];
    return this.http.post(`${this.uri}/updateUser`, user);
  }

  deleteUser(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }
}
