import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../model/user.model";

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