import { Component } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AboutDetailsComponent {
  private aboutContent = "<p>No Content</p>";
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
