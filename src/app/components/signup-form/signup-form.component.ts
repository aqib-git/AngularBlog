import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  registering: boolean;
  signupSuccess: boolean;
  signupError: boolean;
  showValidationErrors: boolean;

  constructor (private fb: FormBuilder, private accountService: AccountService) {
    this.createForm()
  }

  ngOnInit () {
  }

  createForm  () {
    this.signupForm = this.fb.group({
      'userName': ['', [Validators.required, Validators.minLength]],
      'phoneNumber': [''],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    });
  }

  signup () {
    if(this.signupForm.invalid || ! this.passwordMatched) {
      this.showValidationErrors = true && this.signupForm.dirty;
      return;
    }
    this.registering = true;
    this.signupSuccess = false;
    this.signupError = false;
    this.accountService.signup(this.signupForm.value)
      .subscribe((response) => {
        this.registering = false;
        this.signupSuccess = true;
        this.signupForm.reset();
      }, (error) => {
        this.registering = false;
        this.signupError = true;
      })
  }

  get passwordMatched () {
    return this.confirmPassword.value === this.password.value
  }

  get confirmPassword () {
    return this.signupForm.get('confirmPassword');
  }

  get password () {
    return this.signupForm.get('password');
  }

  get email () {
    return this.signupForm.get('email');
  }

  get userName () {
    return this.signupForm.get('userName');
  }

  get phoneNumber () {
    return this.signupForm.get('phoneNumber');
  }
}
