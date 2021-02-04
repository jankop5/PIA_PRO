import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";


/**
 * @module
 * guard kojim se onemogucava pristup stranicama dok se ne izvrsi promena lozinke prilikom prvog logovanja
 */
@Injectable({
    providedIn: 'root'
})
export class FirstLoginGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let username: string = localStorage.getItem("username");
        let passwordChanged: boolean = JSON.parse(localStorage.getItem("passwordChanged"));
        if(username && !passwordChanged){
            this.router.navigate(['/passwordchange']);
            return false;
        }
        else{
            return true;
        }
    }

}