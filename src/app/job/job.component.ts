import { Component, OnInit } from '@angular/core';
import {JobService} from "./job.service";
import {Job} from "./job";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  providers: [JobService],
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([])

  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
    this.jobService.readJobsCsv().subscribe(jobsFile => {
      this.jobs = this.jobService.getJobs(jobsFile)
      this.dataSource = new MatTableDataSource(this.jobs);
    })
  }
  columnsToDisplay = ['company', 'role', 'startDate', 'endDate', 'skills'];
}
