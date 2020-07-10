import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm;
  submitted = false;

  //////
  users;
  success = false;
  invalid = false;

  utente = {
    user: {
      email: "",
      name: "",
      surname: "",
      app_id: 724,
      reset_password_app_id: 724,
      password: "",
      user_type: 0
    }
  }

  constructor(
    private router: Router,
    private ajaxService: AjaxService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.signUpForm = new FormGroup({
    //   name: new FormControl("", [Validators.required]),
    //   lastName: new FormControl("", [Validators.required]),
    //   email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    //   password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: ['', Validators.required]
    // }, {
    //   validator: this.MustMatch('password', 'confirmPassword')
    // });

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

    this.ajaxService.utentiGet("users.json").subscribe((success: any) => {
      this.users = success;
      console.log(this.users);
    });
  }

  settaValori() {
    this.utente.user.name = this.signUpForm.controls.firstName.value;
    this.utente.user.surname = this.signUpForm.controls.lastName.value;
    this.utente.user.email = this.signUpForm.controls.email.value;
    this.utente.user.password = this.signUpForm.controls.password.value;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    this.ajaxService.auth('users/sign_in.json', {
      "user": this.signUpForm.value
    }).subscribe(response => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/']);
    });

    ///
    this.settaValori();

    this.ajaxService.datiServerPost("users.json", this.utente).subscribe(
      (data: any) => {
        this.conferma();
      },
      error => {
        this.invalid = true;
      }
    )

  }

  get f() {
    return this.signUpForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
    this.invalid = false;
  }

  conferma() {
    if (this.invalid) {
      return;
    } else {
      this.success = true;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3500);
    }
  }

}
