import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from '../job';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent {
  public activeSkillDetails: string = '';
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  public jobs: Job[] = [];
  public allSkills: string[] = [];
  private isDebouncing = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])
  columnsToDisplay = ['company', 'role', 'projects','duration'];

  constructor(private jobService: JobService, private sanitizer: DomSanitizer) {
  }


  ngOnInit(): void {
    this.jobService.readJobsCsv().subscribe(jobsFile => {
      this.processJobs(jobsFile);
    })
  }

  public getJobImage(job:Job){
    if(!job.imageUrl || !(job.imageUrl?.trim().length > 0)){
      return "assets/img/chip.svg"
    }
    return this.sanitizer.bypassSecurityTrustUrl(job.imageUrl);
  }

  public setSkillDetails(job:Job){
    if(!this.isDebouncing){
      this.isDebouncing = true;
      setTimeout(() => 
        {
            this.isDebouncing = false;
        },250);
      if (this.activeSkillDetails === job.company) {
      this.activeSkillDetails = '';
      } else {
        this.activeSkillDetails = job.company;
      }
    }
  }

  public getMonthYear(date: Date): string{
    return this.monthNames[date.getMonth()] + " " + date.getFullYear();
  }

  public getDuration(job:Job): string{
    const duration = this.jobService.getJobDuration(job);
    const years = Math.abs(duration.getUTCFullYear() - 1970);
    const months = duration.getUTCMonth();
    const result = (years > 1 ? years + " Years": "") + (months > 1 ? " " + months + " Months.": "");
    return result.trim();
  }

  private processJobs(jobsFile: string){
    this.jobs = this.jobService.getJobs(jobsFile);
    this.dataSource = new MatTableDataSource(this.jobs);
    this.jobs.forEach(job => {
      job.skills.forEach(skill => {
        !this.allSkills.includes(skill) ? this.allSkills.push(skill): void 0;
      })
    })
    this.allSkills.sort((a, b) => a.localeCompare(b))
  }
}