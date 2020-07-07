import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  data;
  total;
  success = false;

  constructor(
    private router: Router
  ) {
    this.data = JSON.parse(localStorage.getItem('data'));
    this.total = JSON.parse(localStorage.getItem('total'));
  }

  ngOnInit(): void {
  }

  confirm() {
    this.success = true;

    this.redirect();
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 3000);
  }

}
