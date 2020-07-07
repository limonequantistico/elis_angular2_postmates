import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  infos;
  products;
  categories;
  cart = [];

  constructor(
    private ajax:AjaxService,
    private activatedRoute: ActivatedRoute
  ) { }

  getProducts(id){
    
    this.ajax.get(id + "/products.json").subscribe((success: any) => {
      // console.log(success);
  
      this.products = success;

    }, (error) => {
  
    });

  }

  getRestaurantInfo(id){
    this.ajax.get(id + "/info.json").subscribe((success: any) => {
      // console.log(success);
  
      this.infos = success;

    }, (error) => {
  
    });
  }

  getCategories(id){
    this.ajax.get(id + "/categories.json").subscribe((success: any) => {
      console.log(success);
  
      this.categories = success;

    }, (error) => {
  
    });
  }

  addToCart(item){
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametri => {
      console.log(parametri.id);
      this.getProducts(parametri.id);
      this.getRestaurantInfo(parametri.id);
      this.getCategories(parametri.id);
    });

    // this.ajax.get("920/info.json").subscribe((success: any) => {
    //   console.log(success);
  
    //   this.infos = success;

    // }, (error) => {
  
    // });

    // this.ajax.get("920/products.json").subscribe((success: any) => {
    //   console.log(success);
  
    //   this.products = success;

    // }, (error) => {
  
    // });

    
  }

}
