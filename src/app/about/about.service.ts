import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutFile = "assets/files/aboutContent.html";  
  constructor(private http: HttpClient) { }


  public getAboutFile(){
  return this.http.get(this.aboutFile, {responseType: "text"});
  }

}
