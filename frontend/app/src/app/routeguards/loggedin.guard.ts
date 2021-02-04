import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

/**
 * @module
 * guard kojim se omogucava pristup pojedinim stranicama samo registrovanim korisnicima
 */
@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let username: string = localStorage.getItem("username");
        if(!username){
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true;
        }
    }

}