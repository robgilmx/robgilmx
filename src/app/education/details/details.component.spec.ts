import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: EducationDetailsComponent;
  let fixture: ComponentFixture<EducationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationDetailsComponent]
    });
    fixture = TestBed.createComponent(EducationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
