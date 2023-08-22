import { Component } from '@angular/core';
import { Education } from './education';
import { EducationService } from './education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
public educations:Education[] = [{"certification":"a","duration":"b","institution":"c","level":"l","school":"s"}];

constructor(private eduService: EducationService) {
}

ngOnInit(): void {
  this.eduService.readEducationCsv().subscribe(eduFileContent => {
    this.processEducations(eduFileContent)
  })
}

private processEducations(eduFileContent: string){
  this.educations = this.eduService.getEducations(eduFileContent);
}
}
