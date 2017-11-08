import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result) {
        let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl');
        // console.log(returnUrl)
        this.router.navigate([returnUrl || '/']);
        } else  
          this.invalidLogin = true; 
      });
  }
}
