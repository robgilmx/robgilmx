import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job} from "./job";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsUrl = 'assets/files/jobs.csv';

  constructor(private http: HttpClient) { }

  getJobs(jobsFileContent: string): Job[] {
    const jobs: Job[] = [];
    const jobList = jobsFileContent?.split("\n");
    jobList?.shift();
    jobList?.forEach(jobText => {
      const jobFields = jobText?.split("|");
      if (jobFields.length > 1){
        let job: Job = {
          company: jobFields[0],
          role: jobFields[1],
          startDate: new Date(jobFields[2]),
          endDate: new Date(jobFields[3]),
          skills: jobFields[4].split(",")
        }
        jobs.push(job);
      }
    })
    return jobs;
  }

  readJobsCsv() {
    return this.http.get(this.jobsUrl, {responseType: 'text'});
  }


}
