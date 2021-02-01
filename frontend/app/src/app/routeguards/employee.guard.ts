import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let type: number = JSON.parse(localStorage.getItem("type"));
        if(type != 1){
            this.router.navigate(['/']);
            return false;
        }
        else{
            return true;
        }
    }

}