import { Component, Input } from '@angular/core';
import { Job } from '../job';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent {

  
  @Input()
  public job: Job | undefined;

  ngOnInit(): void {
  }
}
