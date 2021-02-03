import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let username: string = localStorage.getItem("username");
        let type: number = JSON.parse(localStorage.getItem("type"));
        if(username && type != 0){
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true;
        }
    }

}