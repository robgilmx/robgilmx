import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from "@angular/material/slider";
import { JobComponent } from './job/job.component';
import { MatTableModule } from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import { AboutComponent } from './about/about.component';
import { EducationComponent } from './education/education.component';
import {MatGridListModule} from '@angular/material/grid-list'; 

@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    AboutComponent,
    EducationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatListModule,
    MatCardModule, 
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
