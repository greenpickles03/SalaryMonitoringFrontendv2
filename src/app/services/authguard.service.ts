import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Clear local storage
    //localStorage.clear();

    // Redirect to login page
   // this.router.navigate(['/authentication/login']);
    return false;
  }
}