import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private aboutContent = "<h1>About me</h1><p>No Content</p>";
  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.aboutService.getAboutFile().subscribe(file => {
      this.aboutContent = file;
    })
  }

  public getAboutContent(){
    return this.aboutContent;
  }
}
