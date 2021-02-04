import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @module
 * servis za registraciju
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  /**
   * registrovanje novog korisnika
   * @param user korisnik
   */
  register(user){
    return this.http.post(`${this.uri}/register`, user);
  }
}
