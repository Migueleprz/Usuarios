import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {
  constructor(private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogged = localStorage.getItem('isLogged');
    if(isLogged) {
      this.router.navigate(['home']).then(r => r);
      return false;
    } else {
      return  true;
    }
  }

}
