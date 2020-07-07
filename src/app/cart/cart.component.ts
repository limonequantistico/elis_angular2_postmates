import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  total;
  cart = [];
  form;
  submitted = false;

  constructor(
    private router: Router
  ) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  calculateTotal() {
    this.total = 0;
    _.each(this.cart, (cartElement) => {
      this.total += cartElement.reservation_items[0].price;
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]), //Gli passiamo un validator, per validare appunto i campi
      // 'name': new FormControl(this.form.name, [
      //   Validators.required,
      //   Validators.minLength(4)
      // ]),
      lastName: new FormControl("", [Validators.required]),
      creditCard: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required])
    });
  }

  ngDoCheck(){
    this.calculateTotal();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // display form values on success
    localStorage.setItem('data', JSON.stringify(this.form.value));
    localStorage.setItem('total', JSON.stringify(this.total));
    
    this.router.navigate(['/checkout']);

  }

  sendForm(){
    console.log(this.form.value);
  }

  // addControl(control: AbstractControl): void {
  //   console.log(control);
  // }

  removeItem(item){
    _.remove(this.cart, (i) => i === item);
  }
  
}
