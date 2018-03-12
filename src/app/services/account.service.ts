import { Injectable } from '@angular/core';
import { SignupModel } from '../models/signup-model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { User } from '../models/user-model';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {

  isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject(false);
  }

  signup (model: SignupModel) {
    return this.http.post(environment.apiUrl + 'Account/register', model)
  }

  signin (userName: string, password: string) {
    var body = 'userName=' + encodeURIComponent(userName) + '&password=' + encodeURIComponent(password) + '&grant_type=password';
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    return this.http.post(environment.apiOrigin + 'token', body, {
      headers: headers
    });
  }

  isLoggedIn (): BehaviorSubject<boolean> {
    this.isLoggedInSubject = new BehaviorSubject(!this.isTokenExpired());
    return this.isLoggedInSubject;
  }

  isTokenExpired (): boolean {
    let token: any = localStorage.getItem('token');
    if(!token) {
      return true;
    }
    token = JSON.parse(token);
    if(!token.access_token) {
      return true;
    }
    let currentDate = new Date();
    let expiredAt = new Date(token['.expires']);
    return currentDate.getTime() >= expiredAt.getTime();
  }

  setLogin(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  logout (): void {
    this.setLogin(false);
    this.router.navigate(['/'])
    localStorage.removeItem('token');
  }

  user (): User {
    if(!this.isTokenExpired()) {
      return null;
    }

    let token: any = localStorage.getItem('token');
    token = JSON.parse(token);

    return token.user;
  }
}
