import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private aboutContent = "<p>No Content</p>";
  constructor(private aboutService: AboutService, private router: AppRoutingModule) { }

  ngOnInit(): void {
    this.aboutService.getAboutFile().subscribe(file => {
      this.aboutContent = file.split('</p>')[0]+'</p>';
    })
  }

  public getAboutContent(){
    return this.aboutContent;
  }
}
