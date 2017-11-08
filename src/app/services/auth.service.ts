import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .map(resp => {
        let result = resp.json();
        if (result && result.token) {
          localStorage.setItem('token',result.token);
          return true
        } else {
          return false
        }

      });
  }

  logout() { 
    localStorage.removeItem('token')
  }

  isLoggedIn() { 
    return tokenNotExpired();

    //tokenNotExpired does the same as all of the below

    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');
    // if (!token) return false;
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);
    // console.log("Exp: " + isExpired + "\nExp Date: " + expirationDate)
    // return !isExpired;
  }

  // isAdmin() { //Not needed because property admin can be accessed through currentUser below
  //   let token = localStorage.getItem('token');
  //   if (!token) return false; // Not needed as this check is only performed if user is logged in 
  //   return (new JwtHelper().decodeToken(token)).admin;
  // }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return new JwtHelper().decodeToken(token);
  }
}

