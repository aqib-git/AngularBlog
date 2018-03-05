import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

declare var $:any;

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  signinForm: FormGroup;
  signing: boolean;
  signinSuccess: boolean;
  signinError: boolean;
  showValidationErrors: boolean;

  constructor(private _fb: FormBuilder, private _accountService: AccountService, private _httpClient: HttpClient) {
    this.createForm();
  }

  ngOnInit () {
  }

  createForm  () {
    this.signinForm = this._fb.group({
      'userName': ['', [Validators.required, Validators.minLength]],
      'password': ['', Validators.required]
    });
  }

  signin () {
    this.signing = true;
    this.signinSuccess = false;
    this.signinError = false;
    this._accountService
      .signin(this.userName.value, this.password.value)
      .subscribe((response) => {
        localStorage.setItem('token', JSON.stringify(response));
        this.signing = false;
        this.signinSuccess = true;
        this._accountService.setLogin(true);
        $('#loginModal').modal('toggle')
      }, (error) => {
        this.signing = false;
        this.signinError = true;
      });
  }

  get password () {
    return this.signinForm.get('password');
  }

  get userName () {
    return this.signinForm.get('userName');
  }
}
