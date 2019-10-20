import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router/';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router:Router){}

//Esto me permite acceder a la página principal despues del login .
//Esto es posible con la libreria de JASON Web Token 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(localStorage.getItem('token') != null)
      return true
      else {
        this.router.navigate(['/usuario/login'])
        return false;
      }
    }
}
