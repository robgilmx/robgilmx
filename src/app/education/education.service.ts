import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Education} from "./education";

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private educationUrl = 'assets/files/education.csv';

  constructor(private http: HttpClient) { }
  public getEducations(educationFileContent: string): Education[] {
    const educations: Education[] = [];
    const educationLines = educationFileContent?.split("\n");
    educationLines?.shift();
    educationLines?.forEach(eduText => {
      const eduRow = eduText?.split("|");
      if (eduRow.length > 1){
        let education: Education = {
          institution: eduRow[0],
          school: eduRow[1],
          level: eduRow[2],
          duration: eduRow[3],
          certification: eduRow[4],
        }
        educations.push(education);
      }
    })
    return educations;
  }

  public readEducationCsv() {
    return this.http.get(this.educationUrl, {responseType: 'text'});
  }
}
