import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../model/user.model";

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