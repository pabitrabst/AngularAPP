import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //check condition
    if (sessionStorage.getItem('emailId') == null) {
      alert('You are not allowed to view this page');
      this._router.navigate(['/login']);
      //return false to cancel the navigation
      return false;
    }
    return true;
  }
}
