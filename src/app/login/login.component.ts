import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  submitted = false;

  constructor(
    private router: Router,
    private ajaxService: AjaxService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.ajaxService.auth('users/sign_in.json', {
      "user": this.loginForm.value
    }).subscribe(response => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/']);
    });

    // localStorage.setItem('email', JSON.stringify(this.loginForm.value.email));

    // console.log(JSON.stringify(this.loginForm.value));
    // console.log(JSON.stringify(this.loginForm.value));
    
    // this.router.navigate(['/']);

  }

  get f() {
    return this.loginForm.controls;
  }

}

//nome cognome email password conferma password