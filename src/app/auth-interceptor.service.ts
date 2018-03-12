import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AccountService } from './services/account.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _accountService: AccountService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const token = JSON.parse(localStorage.getItem('token'));
    let access_token = '';
    if(token && token.access_token) {
      access_token = token.access_token
    }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + access_token } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
