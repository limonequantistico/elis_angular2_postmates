import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  baseURL = "https://api.pasto.app/api/v2/utils/";
  base = "https://api.pasto.app/"

  constructor(
    private http: HttpClient
  ) { }

  get(url){
    return this.http.get(this.baseURL + url);
   }

   post(path, obj){
    return this.http.post(this.baseURL + path, obj);
   }

   auth(path, obj){
     return this.http.post(this.base + path, obj);
   }
}
