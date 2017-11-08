import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    // tslint:disable-next-line:curly
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url} });
    return false;
  }
}
