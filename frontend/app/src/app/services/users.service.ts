import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @module
 * servis za sve korisnike
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * azuriranje podataka o korisniku
   * @param user korisnik
   */
  updateUser(user){
    delete user["_id"];
    return this.http.post(`${this.uri}/updateUser`, user);
  }

  /**
   * brisanje korisnika
   * @param username korisnicko ime
   */
  deleteUser(username: string){
    let data = {
      username: username
    }

    return this.http.post(`${this.uri}/deleteUser`, data);
  }
}
