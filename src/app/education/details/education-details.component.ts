import { Component } from '@angular/core';
import { Education } from '../education';
import { EducationService } from '../education.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss']
})
export class EducationDetailsComponent {
  public educations:Education[] = [{"certification":"a","duration":"b","institution":"c","level":"l","school":"s"}];

  constructor(private eduService: EducationService, private sanitizer: DomSanitizer) {
  }
  
  ngOnInit(): void {
    this.eduService.readEducationCsv().subscribe(eduFileContent => {
      this.processEducations(eduFileContent)
    })
  }
  
  private processEducations(eduFileContent: string){
    this.educations = this.eduService.getEducations(eduFileContent);
  }

  
  public getEducationImage(edu:Education){
    if(!edu.imageUrl || !(edu.imageUrl?.trim().length > 0)){
      return "assets/img/chip.svg"
    }
    return this.sanitizer.bypassSecurityTrustUrl(edu.imageUrl);
  }

}