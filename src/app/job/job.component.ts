import { Component, OnInit } from '@angular/core';
import {JobService} from "./job.service";
import {Job} from "./job";

@Component({
  selector: 'app-jobs',
  templateUrl: './job.component.html',
  providers: [JobService],
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  public relevantSkills: RelevantSkill[] = [];
  public jobs: Job[] = [];
  public latestJob: Job | any;
  public yearsOfXP = 0;
  public totalProjects = 0;

  constructor(private jobService: JobService) {
  }


  ngOnInit(): void {
    this.jobService.readJobsCsv().subscribe(jobsFile => {
      this.processJobs(jobsFile);
      this.getLatestJob();
      this.calculateXPYears();
    })
  }

  private calculateXPYears() { 
    this.yearsOfXP = Math.abs(this.jobService.getDuration(
       this.jobService.getFirstJob(this.jobs).startDate,
       this.jobService.getLatestJob(this.jobs).endDate
    ).getUTCFullYear() - 1970);
  }

  private getLatestJob(){
    this.latestJob =  this.jobService.getLatestJob(this.jobs);
  }

  private processJobs(jobsFile: string){
    this.jobs = this.jobService.getJobs(jobsFile);
    this.proccessSkillsAndProjects();
  }

  private proccessSkillsAndProjects(){
    this.relevantSkills = this.skillsToRS(this.jobs[0].skills);
    this.totalProjects = this.jobs[0].projects;
    for(let i = 1; i < this.jobs.length; i++){
      this.totalProjects += this.jobs[i].projects;
      this.jobs[i].skills.forEach(newSkill => {
        this.processNewSkill(newSkill);
        }
      )
    }
    this.formatRSS();
  }

  private formatRSS() {
    this.relevantSkills.sort((a, b) => (b.jobXP) - (a.jobXP) === 0 ?
      a.name.localeCompare(b.name) : (b.jobXP) - (a.jobXP));
    this.relevantSkills = this.relevantSkills.slice(0, 12);
  }

  private processNewSkill(newSkill: string) {
    let exists = false;
    let index = -1;
    exists = this.relevantSkills.some(
      (skill, i) => {
        const oldSkill = skill.name.toLocaleLowerCase();
        const newSkillName = newSkill.toLocaleLowerCase().trim();
        index = i;
        return oldSkill === newSkillName;
      });
    this.getSkillRelevancy(exists, index, newSkill);
  }

  private getSkillRelevancy(exists: boolean, index: number, newSkill: string) {
    if (!!exists && index >= 0) {
      let skillToReplace = this.relevantSkills[index];
      this.relevantSkills[index] = { name: skillToReplace.name, jobXP: (1 + skillToReplace.jobXP) };
    } else {
      this.relevantSkills.push({ name: newSkill.trim(), jobXP: 1 });
    }
  }

  private skillsToRS(skills: string[]): RelevantSkill[]{
    const relevantSkills: RelevantSkill[] = [];
    skills.forEach(s => relevantSkills.push({ name: s.trim(), jobXP: 1 }))
    return relevantSkills;
  }
}

interface RelevantSkill {name: string, jobXP: number}
