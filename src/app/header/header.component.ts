import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data;
  authenticated = false;

  constructor() {
    // this.data = JSON.parse(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    console.log("Authenticated:" + JSON.stringify(this.data));
  }

  ngDoCheck() {

    this.retrieveMail();
    this.checkAuthentication();

  }

  retrieveMail() {
    // this.data = JSON.parse(localStorage.getItem('email'));
    this.data = JSON.parse(localStorage.getItem('user'));
  }

  checkAuthentication() {
    if (this.data == null) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
  }

  checkData() {
    if (this.data == null) {
      alert("Email vuota");
    } else {
      alert("Email piena");
    }
  }

  logout() {
    // localStorage.setItem('login', '[]');

    // this.data.email = null
    // this.data.password = null;

    // localStorage.setItem('login[0]', null);

    // JSON.parse(localStorage.getItem('email')) = null;

    ///////////////////////////////////////
    // localStorage.setItem("email", null);
    localStorage.setItem("user", null);
    ///////////////////////////////////////

    // console.log(JSON.parse(localStorage.getItem('login')).email);

  }

}
