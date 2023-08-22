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
  jobs: Job[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  constructor(private jobService: JobService) {
  }


  private processJobs(jobsFile: string){
    this.jobs = this.jobService.getJobs(jobsFile);
    this.dataSource = new MatTableDataSource(this.jobs);
  }

  ngOnInit(): void {
    this.jobService.readJobsCsv().subscribe(jobsFile => {
      this.processJobs(jobsFile);
    })
  }
  columnsToDisplay = ['company', 'role', 'skills', 'projects', 'startDate', 'endDate'];
}
