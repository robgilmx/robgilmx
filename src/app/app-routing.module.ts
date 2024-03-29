import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutDetailsComponent } from './about/details/about-details.component';
import { EducationDetailsComponent } from './education/details/education-details.component';
import { JobDetailsComponent } from './job/details/job-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutDetailsComponent },
  { path: 'jobs', component: JobDetailsComponent },
  { path: 'education', component: EducationDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
