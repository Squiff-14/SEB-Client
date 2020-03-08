
import { AuthService } from '../services/authentication/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(result =>  this.isLoggedIn = result);
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
