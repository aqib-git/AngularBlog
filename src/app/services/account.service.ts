import { Injectable } from '@angular/core';
import { SignupModel } from '../models/signup-model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { RequestOptions } from 'http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class AccountService {

  isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
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
    let token: any = localStorage.getItem('token');
    if(!token) {
      return this.isLoggedInSubject;
    }
    token = JSON.parse(token);
    let currentDate = new Date();
    let expiredAt = new Date(token['.expires']);
    this.isLoggedInSubject = new BehaviorSubject(currentDate.getTime() < expiredAt.getTime());
    return this.isLoggedInSubject;
  }

  setLogin(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  logout (): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');
  }
}
