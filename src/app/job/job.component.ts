import { Component, OnInit } from '@angular/core';
import {JobService} from "./job.service";
import {Job} from "./job";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-jobs',
  templateUrl: './job.component.html',
  providers: [JobService],
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  public jobs: Job[] = [];
  public allSkills: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])
  columnsToDisplay = ['company', 'role', 'projects','duration'];

  constructor(private jobService: JobService) {
  }


  ngOnInit(): void {
    this.jobService.readJobsCsv().subscribe(jobsFile => {
      this.processJobs(jobsFile);
    })
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
