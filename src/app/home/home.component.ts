import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  infos;
  products;

  constructor(
    private ajax: AjaxService,
  ) { }

  ngOnInit() {
    this.ajax.get("724/partners.json").subscribe((success: any) => {
      console.log(success);
  
      this.infos = success;

      console.log(success.app.name);

      if (this.infos.app_infos.logo_url == null) {
        console.log("empty");
      }

    }, (error) => {
  
    });
  }

}
