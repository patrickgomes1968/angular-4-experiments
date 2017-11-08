import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    const user = this.authService.currentUser;
    // tslint:disable-next-line:curly
    if (user && user.admin) return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
