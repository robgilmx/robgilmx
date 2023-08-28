import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job} from "./job";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsUrl = 'assets/files/jobs.csv';

  constructor(private http: HttpClient) { }

  public getJobs(jobsFileContent: string): Job[] {
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
          endDate: !!jobFields[3] ? new Date(jobFields[3]) : new Date(),
          skills: jobFields[4].split(","),
          projects: Number(jobFields[5]),
          webpage: jobFields[6],
        }
        if (jobFields.length > 7) {
          job.imageUrl = jobFields[7];   
        }
        jobs.push(job);
      }
    })
    return jobs;
  }

  public readJobsCsv() {
    return this.http.get(this.jobsUrl, {responseType: 'text'});
  }

  public getLatestJob(jobs: Job[]):Job{
    let latestJob = jobs[0];
    for (let i = 1; i < jobs.length; i++){
      if (jobs[i].endDate > latestJob.endDate){
          latestJob = jobs[i];
      }
    }
    return latestJob;
  }

  public getFirstJob(jobs: Job[]):Job{
    let firstJob = jobs[0];
    for (let i = 1; i < jobs.length; i++){
      if (jobs[i].startDate < firstJob.startDate){
        firstJob = jobs[i];
      }
    }
    return firstJob;
  }

  public getJobDuration(job:Job): Date{
    return this.getDuration(job.startDate, job.endDate);
  }

  public getDuration(startDate:Date, endDate:Date): Date{
    const ageDifMs = endDate.getTime() - startDate.getTime();
    return new Date(ageDifMs); // miliseconds from epoch
  }
}
